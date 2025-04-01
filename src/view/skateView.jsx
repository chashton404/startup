import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { RollerSkate } from '../../lib/originalRollerskate';

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

export function SkateView({accountData, setAccountData}) {
    let localAccountData = JSON.parse(localStorage.getItem('accountData'));
    const existingUserIndex = localAccountData.findIndex((localAccountData) => localAccountData.name === localStorage.getItem('username'));
    
    React.useEffect(() => {
        console.log(existingUserIndex)
        console.log(localStorage.getItem('username'))
        console.log(localAccountData[existingUserIndex].skates)
    }, []);

    const [skates, setSkates] = React.useState([
        { skateName: 'orange', topColor:'#F1592A' , stripeColor:'#F1592A' , baseColor:'#F1592A' , wheelColor:'#F1592A' , toeStopColor:'#F1592A' , skateStatus: 'equipped'},
        { skateName: 'blue', topColor:'#0F75BC' , stripeColor:'#0F75BC' , baseColor:'#0F75BC' , wheelColor:'#0F75BC' , toeStopColor:'#0F75BC' , skateStatus: 'not equipped'}
        ]);
    //React.useState(localAccountData[existingUserIndex].skates);

    const [confirmOpenDeleteModal, setConfirmOpenDeleteModal] = React.useState(false);
    const [errorModalOpen, setErrorModalOpen] = React.useState(false);
    const [skateToDelete, setSkateToDelete] = React.useState(null);

    function deleteSkate(index) {
        setSkateToDelete(index);
        setConfirmOpenDeleteModal(true);
    }

    function confirmDelete() {
        const newSkates = skates.filter((skate, index) => index !== skateToDelete);
        setSkates(newSkates);
        setConfirmOpenDeleteModal(false);
        setSkateToDelete(null);
    }

    function cancelDelete() {
        setConfirmOpenDeleteModal(false);
        setSkateToDelete(null);
    }
    
    function openErrorModal() {
        console.log('openErrorModal called');
        setErrorModalOpen(true);
    }

    function closeErrorModal() {
        setErrorModalOpen(false);
    }
    
    function equipSkate(index) {
        console.log('equipSkate called on skate with the index of' + index);

        const newSkates = skates.map((skate, i) => {
            if (i === index) {
                return {...skate, skateStatus: 'equipped'};
            } else {
                return {...skate, skateStatus: 'not equipped'};
            }
        });

        setSkates(newSkates);
    }

    function printSkateColors(skate) { 
        console.log('Top Color: ' + skate.topColor);
        console.log('Stripe Color: ' + skate.stripeColor);  
        console.log('Base Color: ' + skate.baseColor);
        console.log('Wheel Color: ' + skate.wheelColor);
        console.log('Toe Stop Color: ' + skate.toeStopColor);
    }
    
return (
    <main style={{ display: 'block' }}>
        <ConfirmDeleteModal isOpen={confirmOpenDeleteModal} onConfirm={confirmDelete} onCancel={cancelDelete} /> {/* Here we render the confirmModal that we made telling it 
                                                                                                        to not load and when it is truly deleted it should use
                                                                                                        the confirmDelete function and when it it's canceled it 
                                                                                                        should use the cancelDelete function  */}
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
            {skates.map((skate, index) => (
                <div key={index} className="col-6 col-md-3 p-3">
                    <div className="card p-3">
                        <RollerSkate 
                            topColor= {skate.topColor}
                            stripeColor= {skate.stripeColor}
                            baseColor= {skate.baseColor}
                            wheelColor= {skate.wheelColor}
                            toeStopColor= {skate.toeStopColor}
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

