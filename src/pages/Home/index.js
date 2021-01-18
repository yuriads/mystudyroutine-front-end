import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo6.jpeg';

export default function Logon() {
    const history = useHistory();

    return (
        <div className="logon-container">
            <img src={logoImg} alt="My Study Routine" />
            <section className="form">

                <h1>Bem-vindo a plataforma de rotinas de estudo</h1>

                <Link to={'/loginpro'}>
                    <button className="button">Pisicólogo</button>
                </Link>

                <Link to={'/login'}>
                    <button className="button">Aluno</button>
                </Link>
            </section>
        </div>
    )
}