import React from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";

export function Login({setUserName}) {
    const [userNameLocal, setUserNameLocal] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    function handleUserNameChange(event) {
        setUserNameLocal(event.target.value);
        console.log(userNameLocal);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function loginUser() {
        const response = await fetch(`api/auth/login`, {
            method: 'post',
            body: JSON.stringify({ userName: userNameLocal, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userNameLocal);
            setUserName(userNameLocal);
            navigate('/landing');
        } else {
            toast.error('Username or password is incorrect.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    }

    async function createUser() {
        const response = await fetch(`api/auth/create`, {
            method: 'post',
            body: JSON.stringify({userName: userNameLocal, password: password}),
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
                pauseOnHover: false,
                draggable: true,
            });
        } else if (response?.status === 409) {
            toast.error('Username already exists. Please choose a different username.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        } else {
            toast.error('Account creation failed. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
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
                        onChange={handleUserNameChange}
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
                        <button type="button" onClick={loginUser} className="btn signin-button-primary" style={{ width: '100%' }} disabled={!userNameLocal || !password}>
                            Login
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button type="button" onClick={createUser} className="btn signin-button-secondary" style={{ width: '100%' }} disabled={!userNameLocal || !password}>
                            Create Account
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}