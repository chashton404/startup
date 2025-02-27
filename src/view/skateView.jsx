import React from 'react';

export function SkateView() {
return (
    <main style={{ display: 'block' }}>
        <div className="row-md-2 justify-content-center p-3">
            <div className="col">
                <a className="btn signin-button-primary" href="landingPageBootstrap.html">Back</a>
            </div>
            <div className="col">
                <h2 style={{ textAlign: 'center' }}>Welcome to the Skate Garage</h2>
            </div>
        </div>
        <div className="row justify-content-center p-3">
            <div className="col-6 col-md-3 p-3">
                <div className="card p-3">
                    <img src="public/skate-placeholders/cool-guy-skate-placeholder.svg" alt="Skate Image" className="img-fluid" />
                    <h3>Cool Guy</h3>
                    <button className="btn signin-button-primary mb-2">Equip</button>
                    <button className="btn signin-button-secondary">Delete</button>
                </div>
            </div>
            <div className="col-6 col-md-3 p-3">
                <div className="card p-3">
                    <img src="public/skate-placeholders/cool-mint-skate-placeholder.svg" alt="Skate Image" className="img-fluid" />
                    <h3>Cool Mint</h3>
                    <button className="btn signin-button-primary mb-2">Equip</button>
                    <button className="btn signin-button-secondary">Delete</button>
                </div>
            </div>
            <div className="col-6 col-md-3 p-3">
                <div className="card p-3">
                    <img src="public/skate-placeholders/fanta-skate-placeholder.svg" alt="Skate Image" className="img-fluid" />
                    <h3>Fanta</h3>
                    <button className="btn signin-button-primary mb-2">Equip</button>
                    <button className="btn signin-button-secondary">Delete</button>
                </div>
            </div>
            <div className="col-6 col-md-3 p-3">
                <div className="card p-3">
                    <img src="public/skate-placeholders/fire-and-ice-skate-placeholder.svg" alt="Skate Image" className="img-fluid" />
                    <h3>Fire and Ice</h3>
                    <button className="btn signin-button-primary mb-2">Equip</button>
                    <button className="btn signin-button-secondary">Delete</button>
                </div>
            </div>
        </div>
    </main>
);
}

