import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo6.jpeg';

export default function Logon(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        
        try {
            const response = await api.post('session', { email, password });

            //gravando o Id e o Name no Storage para utiliza-los na nossa aplicação
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <img src={logoImg} alt="My Study Routine"/>
            <section className="form">

                <form onSubmit={handleLogin}>
                    <h1>Faça o seu Login</h1>

                    <input
                        type="email"
                        placeholder="Seu email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Sua senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#1E90FF"/>
                        Fazer cadastro
                    </Link>
                </form>
            </section>
        </div>
    )
}