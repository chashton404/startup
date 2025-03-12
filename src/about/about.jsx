import React from 'react';
import { NavLink } from "react-router-dom";

export function AboutPage() {
    return(
        <main style={{height: 'calc(100vh - 200px)'}}>
            <div className="container">
                <div className="row w-100 pt-4">
                    <NavLink to="/landing" className="back-button"> &lt; &lt; BACK </NavLink>
                </div>
                <h1>About</h1>
                <p style={{textAlign: 'center'}}>
                    This is a simple application that allows users to design their own skates. Users can choose from a variety of colors and designs to create a custom skate.
                </p>
            </div>
        </main>
    );
}