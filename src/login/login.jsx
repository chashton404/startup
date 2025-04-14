import React from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function AccountCreatedMessage({ isOpen }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="account-created-message">
            <p style={{ color: 'blue', fontSize: '14px' }}>
                Account created successfully. You can now log in.
            </p>
        </div>
    );
}

function LoginSubtext({isOpen, message, color}) {
    // This component is used to display a message below the login form.
    if (!isOpen) {
        return null;
    }

    return (
        <div className="login-subtext">
            <p style={{ color: color, fontSize: '14px' }}>
                {message}
            </p>
        </div>
    );
}

export function Login({setUsername}) {
    const [usernameLocal, setUsernameLocal] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [LoginSubtextOpen, setLoginSubtextOpen] = React.useState(false);
    const [loginSubtextMessage, setLoginSubtextMessage] = React.useState('');
    const [loginSubtextColor, setLoginSubtextColor] = React.useState('black')
    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsernameLocal(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function loginUser() {
        const response = await fetch(`api/auth/login`, {
            method: 'post',
            body: JSON.stringify({ username: usernameLocal, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', usernameLocal);
            setUsername(usernameLocal);
            navigate('/landing');
        } else {
            toast.error('Username or password is incorrect.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }

    async function createUser() {
        const response = await fetch(`api/auth/create`, {
            method: 'post',
            body: JSON.stringify({username: usernameLocal, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        if (response?.status === 200) {
            toast.success('Account created successfully! You can now log in.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            toast.error('Account creation failed. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
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