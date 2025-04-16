import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { RollerSkate } from '../../lib/originalRollerskate';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function SkateDesign() {
    const [topColor, setTopColor] = React.useState('#231f20');
    const [stripeColor, setStripeColor] = React.useState('#231f20');
    const [baseColor, setBaseColor] = React.useState('#231f20');
    const [wheelColor, setWheelColor] = React.useState('#231f20');
    const [toeStopColor, setToeStopColor] = React.useState('#231f20');

    const colorOptions = [
        { color: '#231f20', className: 'selector-button-black' },
        { color: '#BF1E2D', className: 'selector-button-red' },
        { color: '#F1592A', className: 'selector-button-orange' },
        { color: '#0F75BC', className: 'selector-button-blue' },
        { color: '#2BB673', className: 'selector-button-green' },
    ];

    const [skateNameLocal, setSkateNameLocal] = React.useState('');


    async function addSkate(topColor, stripeColor, baseColor, wheelColor, toeStopColor) {
        let newSkate = { skateName: skateNameLocal, topColor: topColor, stripeColor: stripeColor, baseColor: baseColor, wheelColor: wheelColor, toeStopColor: toeStopColor, skateStatus: 'not equipped' };
        const response=await fetch(`api/addSkate`, {
            method: 'post', 
            body: JSON.stringify(newSkate),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        if (response.status === 200) {
            toast.success('Skate Added Successfully', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                autoClose: 3000,
            });
        }
    }

    function handleSkateNameChange(event) {
        setSkateNameLocal(event.target.value);
    }


  return (
    <main>
        <div className="container">
            <div className="row pt-5">
                <div className="col-md-6 justify-content-center">
                    <div className="row-md-2">
                        <div>  
                            <input type="text" name="username" placeholder="Skate Name" className="skate-name-input" onChange={handleSkateNameChange}/>
                        </div>
                    </div>
                    <div className="row-md-2 width: 100%">
                        <div className="row-md-6">
                            <h3>
                                Top
                            </h3>
                        </div>
                        <div className="row-md-6 d-flex justify-content-center">
                            {colorOptions.map((option, index) => (
                            <div key={index} className="col d-flex justify-content-center">
                                <button onClick={() => setTopColor(option.color)} className={option.className}>
                                    <svg width="50" height="25" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="50" height="25" x="0" y="0" fill={option.color} />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="row-md-2">
                        <div className="row-md-6">
                            <h3>
                                Stripes
                            </h3>
                        </div>
                        <div className="row-md-6 d-flex justify-content-center">
                            {colorOptions.map((option, index) => (
                            <div key={index} className="col d-flex justify-content-center">
                                <button onClick={() => setStripeColor(option.color)} className={option.className}>
                                    <svg width="50" height="25" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="50" height="25" x="0" y="0" fill={option.color} />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="row-md-2">
                        <div className="row-md-6">
                            <h3>
                                Base
                            </h3>
                        </div>
                        <div className="row-md-6 d-flex justify-content-center">
                            {colorOptions.map((option, index) => (
                            <div key={index} className="col d-flex justify-content-center">
                                <button onClick={() => setBaseColor(option.color)} className={option.className}>
                                    <svg width="50" height="25" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="50" height="25" x="0" y="0" fill={option.color} />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        </div>
                    </div><div className="row-md-2">
                        <div className="row-md-6">
                            <h3>
                                Wheels
                            </h3>
                        </div>
                        <div className="row-md-6 d-flex justify-content-center">
                            {colorOptions.map((option, index) => (
                            <div key={index} className="col d-flex justify-content-center">
                                <button onClick={() => setWheelColor(option.color)} className={option.className}>
                                    <svg width="50" height="25" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="50" height="25" x="0" y="0" fill={option.color} />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        </div>
                    </div><div className="row-md-2">
                        <div className="row-md-6">
                            <h3>
                                Toe Stop
                            </h3>
                        </div>
                        <div className="row-md-6 d-flex justify-content-center">
                            {colorOptions.map((option, index) => (
                            <div key={index} className="col d-flex justify-content-center">
                                <button onClick={() => setToeStopColor(option.color)} className={option.className}>
                                    <svg width="50" height="25" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="50" height="25" x="0" y="0" fill={option.color} />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center pt-5">
                    <div style={{border: "2px solid black", backgroundColor: "white", borderRadius: "15px", padding: "20px"}}>
                        <RollerSkate
                            topColor={topColor}
                            stripeColor={stripeColor}
                            baseColor={baseColor}
                            wheelColor={wheelColor}
                            toeStopColor={toeStopColor}
                            width="350px"
                            height="350px"

                        />
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center pt-5">
                <NavLink to="/landing" className="btn signin-button-secondary">Cancel</NavLink>
                <NavLink to="/skateView" className="btn signin-button-primary" onClick={(e) => {
                    if (!skateNameLocal) {
                        e.preventDefault();
                        alert('Please enter a skate name');
                    }
                    else {
                        addSkate(topColor, stripeColor, baseColor, wheelColor, toeStopColor)
                    }
                }}>Add to Skate Garage</NavLink>
            </div>
        </div>
    </main>
  );
}