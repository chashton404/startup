import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export function LandingPage() {
return (
    <main style={{ height: 'calc(100vh - 200px)' }}>
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
                            <NavLink to="/landing" className="button-not-available">
                                RACE <span style={{ fontFamily: "'Syne', Sans-serif" }}>(Coming Soon)</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="container">
                        <div className="row w-100 mb-3">
                            <h2 className="text-center">TOP SKATES</h2>
                        </div>
                        <div className="row w-100">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Chase</td>
                                        <td>1:30</td>
                                    </tr>
                                    <tr>
                                        <td>Jeff</td>
                                        <td>1:45</td>
                                    </tr>
                                    <tr>
                                        <td>Casey</td>
                                        <td>2:00</td>
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