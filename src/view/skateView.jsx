import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { RollerSkate } from './rollerskate';


const skates = [
    { skateName: 'one', skateStatus: 'equipped'},
    { skateName: 'two', skateStatus: 'not equipped'},
    { skateName: 'three', skateStatus: 'not equipped'}
];

const equippedSkateIndex = 0;

function equipSkate(skateName) {
    console.log('equipSkate called on ' + skateName);
}

export function SkateView() {
return (
    <main style={{ display: 'block' }}>
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
                        <img src="public/skate-placeholders/cool-mint-skate-placeholder.svg" alt="Skate Image" className="img-fluid" />
                        <h3>{skate.skateName}</h3>
                        {skate.skateStatus === 'equipped' ? (
                            <button className="btn signin-button-secondary" disabled>Equipped</button>
                        ) : (
                            <button className="btn signin-button-primary" onClick={() => equipSkate(skate.skateName)}>Equip</button>
                        )}
                        <button className="btn signin-button-secondary">Delete</button>
                    </div> 
                </div>
            ))}
        </div>
    </main>
);
}

