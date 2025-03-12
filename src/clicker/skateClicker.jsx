import React from 'react';
import { NavLink } from "react-router-dom";

export function SkateClicker() {
    return (
        <main style={{ height: 'calc(100vh - 200px)' }}>
            <div className="container">
                <div className="row w-100 pt-4">
                    <div className="col-md-2">
                        <NavLink to="/landing" className="back-button"> &lt; &lt; BACK </NavLink>
                    </div>
                    <div className="col-md-10">
                        <h2>Click the Skate to increase your score and become the top skater!</h2>
                    </div>  
                </div>
                <div className="row w-100 p-3">
                    <div style={{border: "2px solid black", backgroundColor: "white", borderRadius: "15px", padding: "20px"}}>
                        <img src="public/skate-placeholders/ninja-skate.svg" alt="live rendering of the options selected" className="skate-designer-rendering"/>
                    </div>
                </div>
                <div className="row w-100 mb-3">
                    <p>Your score: 0</p>
                </div>
            </div>
        </main>
    );
}