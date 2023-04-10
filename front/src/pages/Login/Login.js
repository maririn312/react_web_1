import React, { useState, useContext } from 'react';
import { AuthContext } from '../../store/auth.store.js';
import { Input, Label } from '../../components/Form';
import Button from '../../components/Button';
import './Login.scss';

const apiUrl = process.env.REACT_APP_API_URL;

const Login = (props) => {
    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        const datas = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: { "Content-Type": "application/json" }
        };

        fetch(apiUrl + '/api/login', datas)
        .then(response => response.json())
        .then(result => {
            if(result.status === 200 && result.token) {
                dispatch({
                    type: "LOGIN",
                    data: result
                });
            }
        });
    };

    return (
        <div className="loginPage">
            <div className="loginBox">
                <Label name="Нэвтрэх цонх" fsize={28} />
                <div className="loginInputArea">
                    <Input
                        type="email"
                        value={email}
                        pholder="Нэвтрэх нэр"
                        onChange ={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="loginInputArea">
                    <Input
                        type="password"
                        value={password}
                        pholder="Нууц үг"
                        onChange ={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login">
                    <Button name="Нэвтрэх" onClick={ login } />
                </div>
            </div>
        </div>
    )
}

export { Login }
