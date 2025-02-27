import React from 'react';

export function Login() {
    return (
        <main className="d-flex justify-content-center align-items-center vh-100">
            <form action="landingPageBootstrap.html" className="text-center" style={{ width: '33%' }}>
                <h2 style={{ textAlign: 'center' }}>Please sign in to begin racing</h2>
                <div>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Username"
                        style={{
                            marginBottom: '-1px',
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '18px'
                        }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        style={{
                            marginBottom: '10px',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '18px'
                        }}
                    />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button type="submit" className="btn signin-button-primary" style={{ width: '100%' }}>
                            Login
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn signin-button-secondary" style={{ width: '100%' }}>
                            Create Account
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}