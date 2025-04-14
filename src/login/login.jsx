import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";

//we can also just make it so that text appears if we receive that the user's account does not exist
function ErrorMessage({ isOpen }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="error-message">
            <p style={{ color: 'red', fontSize: '14px' }}>
                Username or password is incorrect. Please try again.
            </p>
        </div>
    );
}

export function Login({setUsername}) {
    const [usernameLocal, setUsernameLocal] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessageOpen, setErrorMessageOpen] = React.useState(false);
    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsernameLocal(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function loginUser() {
        loginOrCreate(`api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: usernameLocal, password: password }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', usernameLocal);
            navigate('/landing');
        } else {
            if (endpoint === `api/auth/login`){  
                setErrorMessageOpen(true);
                setTimeout(() => {
                    setErrorMessageOpen(false);
                }, 3000);
            }
        }
    }


    return (
        <main className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 200px)'}}>
            <form className="text-center" style={{ width: '33%' }}>
                <h2 style={{ textAlign: 'center' }}>Please sign in to begin racing</h2>
                <div>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Username"
                        onChange={handleUsernameChange}
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
                        onChange={handlePasswordChange}
                        style={{
                            marginBottom: '10px',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '18px'
                        }}
                    />
                </div>
                <ErrorMessage isOpen={errorMessageOpen} />
                <div className="row">
                    <div className="col-md-6">
                        <button type="button" onClick={loginUser} className="btn signin-button-primary" style={{ width: '100%' }} disabled={!usernameLocal || !password}>
                            Login
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button type="button" onClick={createUser} className="btn signin-button-secondary" style={{ width: '100%' }} disabled={!usernameLocal || !password}>
                            Create Account
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}