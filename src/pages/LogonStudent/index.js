import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo6.jpeg';

export default function Logon(){
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        
        try {
            const response = await api.post('sessionstudent', { id, name });

            //gravando o Id e o Name no Storage para utiliza-los na nossa aplicação
            localStorage.setItem('userId', id);
            localStorage.setItem('userNameStudent', response.data.name);

            history.push('/routine');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <img src={logoImg} alt="My Study Routine"/>
            <section className="form">

                <form onSubmit={handleLogin}>
                    <h1>Bem-vind@</h1>

                    <input
                        type="text"
                        placeholder="Digite seu código de acesso"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    {/* <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#1E90FF"/>
                        Voltar ao início
                    </Link> */}
                </form>
            </section>
        </div>
    )
}