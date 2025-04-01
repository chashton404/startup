import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { RollerSkate } from '../../lib/originalRollerskate';

function SkateDesigned() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        navigate("/skateView"); // Navigates to the Skate View page
    }
}

function SkateDesignCanceled() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        navigate("/landing"); // Navigates to the landing page
    }   
}




export function SkateDesign() {
    const [topColor, setTopColor] = React.useState('black');
    const [stripeColor, setStripeColor] = React.useState('black');
    const [baseColor, setBaseColor] = React.useState('black');
    const [wheelColor, setWheelColor] = React.useState('black');
    const [toeStopColor, setToeStopColor] = React.useState('black');

    const handleColorChange = (event, setColor) => {
        setColor(event.target.value);
    }

    const colorOptions = [
        { color: '#231f20', className: 'selector-button-black' },
        { color: '#BF1E2D', className: 'selector-button-red' },
        { color: '#F1592A', className: 'selector-button-orange' },
        { color: '#0F75BC', className: 'selector-button-blue' },
        { color: '#2BB673', className: 'selector-button-green' },
      ];


  return (
    <main>
        <div className="container">
            <div className="row pt-5">
                <div className="col-md-6 justify-content-center">
                    <div className="row-md-2">
                        <form action="skateDesign.html" method="get">
                            <div>  
                                <input type="text" name="username" placeholder="Skate Name" className="skate-name-input"/>
                            </div>
                        </form>
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
                        />
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center pt-5">
                <NavLink to="/landing" className="btn signin-button-secondary">Cancel</NavLink>
                <NavLink to="/skateView" className="btn signin-button-primary">Add to Skate Garage</NavLink>
            </div>
        </div>
    </main>
  );
}