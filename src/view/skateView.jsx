import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { RollerSkate } from '../../lib/Rollerskate';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './modal.css';

//We make a custom confirmation modal for if the user wants to delete the skate
function ConfirmDeleteModal({ isOpen, onConfirm, onCancel}) {  //We pass in the props isOpen, onConfirm, and onCancel
    if (!isOpen) {
        return null; //If we recieve that isOpen is false, the component will not render
    }

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h3>Are you sure you want to delete this skate?</h3>
                <div className="button-container">
                    <button className="btn cancel-button" onClick={onCancel}>Cancel</button>
                    <button className="btn confirm-button" onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

function ErrorModal({ isOpen, onCancel}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h3>You cannot delete an equipped skate</h3>
                <p style={{ textAlign: 'center' }}>Please Unequip the skate and try again</p>
                <div className="button-container">
                    <button className="btn cancel-button" onClick={onCancel}>Ok</button>
                </div>
            </div>
        </div>
    );

}

export function SkateView() {

    const [skates, setSkates] = React.useState([]);

    React.useEffect(() => {
        async function fetchSkates() {
            const response = await fetch(`api/getSkates`, {
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });
            const data = await response.json();
            setSkates(data);
        }

        fetchSkates();
    }, []);

    const [confirmOpenDeleteModal, setConfirmOpenDeleteModal] = React.useState(false);
    const [errorModalOpen, setErrorModalOpen] = React.useState(false);
    const [skateToDelete, setSkateToDelete] = React.useState(null);

    function deleteSkate(index) {
        setSkateToDelete(index);
        setConfirmOpenDeleteModal(true);
    }

    async function confirmDelete() {
        // Call the API to delete the skate
        const response = await fetch(`api/deleteSkate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ index: skateToDelete }),
        })

        if (response.status === 200) {
            const data = await response.json();
            setSkates(data.skates);
            setConfirmOpenDeleteModal(false);
            setSkateToDelete(null);
            toast.success('Skate deleted successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            toast.error('An unexpected error occurred while deleting the skate.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    }

    function cancelDelete() {
        setConfirmOpenDeleteModal(false);
        setSkateToDelete(null);
    }
    
    function openErrorModal() {
        setErrorModalOpen(true);
    }

    function closeErrorModal() {
        setErrorModalOpen(false);
    }
    
    async function equipSkate(index) {
        // Call the API to equip the skate
        const response = await fetch(`api/equipSkate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ index }),
        })
        if (response.status === 200) {
            const data = await response.json();
            setSkates(data.skates);
            toast.success('Skate equipped successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        else {
            toast.error('An unexpected error occurred while equipping the skate.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }   
    }
    
return (
    <main style={{ display: 'block' }}>
        <ConfirmDeleteModal isOpen={confirmOpenDeleteModal} onConfirm={confirmDelete} onCancel={cancelDelete} /> 
        <ErrorModal isOpen={errorModalOpen} onCancel={closeErrorModal} />
        <div className="row-md-2 justify-content-center p-3">
            <div className="col">
                <NavLink to="/landing" className="btn signin-button-primary">Back</NavLink>
            </div>
            <div className="col">
                <h2 style={{ textAlign: 'center' }}>Welcome to the Skate Garage</h2>
            </div>
        </div>
        <div className="row justify-content-start p-3">
            {skates && skates.map((skate, index) => (
                <div key={index} className="col-6 col-md-3 p-3">
                    <div className="card p-3">
                        <RollerSkate 
                            topColor= {skate.topColor}
                            stripeColor= {skate.stripeColor}
                            baseColor= {skate.baseColor}
                            wheelColor= {skate.wheelColor}
                            toeStopColor= {skate.toeStopColor}
                            uniqueId={`skate-${index}`}
                        />
                        <h3 onClick = {() => printSkateColors(skate)}>{skate.skateName}</h3>
                        {skate.skateStatus === 'equipped' ? (
                            <button className="btn signin-button-secondary mb-1" disabled>Equipped</button>
                        ) : (
                            <button className="btn signin-button-primary mb-1" onClick={() => equipSkate(index)}>Equip</button>
                        )}
                        <button className="btn signin-button-secondary" onClick={skate.skateStatus === 'equipped' ? (() => openErrorModal()) : (() => deleteSkate(index))}>Delete</button>
                    </div> 
                </div>
            ))}
        </div>
    </main>
);
}

