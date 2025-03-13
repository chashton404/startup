import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export function LandingPage() {
return (
    <main style={{ height: 'calc(100vh - 200px)', position: 'relative'}}>
        <NavLink to="/login" className="position-absolute top-0 end-0 mt-3 me-3"
        style={{ fontFamily: 'Syne', zIndex: 1 }}>Logout</NavLink>
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="container">
                        <div className="row w-100 pb-3">
                            <h2>Welcome, User!</h2>
                        </div>
                        <div className="row w-100 mb-3">
                            <NavLink to="/skateDesign" className="landing-page-button">DESIGN SKATE</NavLink>
                        </div>
                        <div className="row w-100 mb-3">
                            <NavLink to="/skateView" className="landing-page-button">VIEW SKATES</NavLink>
                        </div>
                        <div className="row w-100 mb-3">
                            <NavLink to="/skateClicker" className="button-not-available">
                                Skate Clicker <span style={{ fontFamily: "'Syne', Sans-serif" }}>(Coming Soon)</span>
                            </NavLink>
                        </div>
                        <div className="row w-100 mb-3">
                            <NavLink to="/about" className="landing-page-button">ABOUT</NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="container">
                        <div className="row w-100 mb-3">
                            <h2 className="text-center">TOP SKATERS</h2>
                        </div>
                        <div className="row w-100">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Clicks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Chase</td>
                                        <td>204</td>
                                    </tr>
                                    <tr>
                                        <td>Jeff</td>
                                        <td>199</td>
                                    </tr>
                                    <tr>
                                        <td>Casey</td>
                                        <td>189</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
);
}