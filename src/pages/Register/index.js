import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo6.jpeg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            password,
            password2,
        };

        try {
            if(data.password !== data.password2){
                alert('Senhas diferentes!');
            }else{
                const response = await api.post('users', data);

                alert(`Cadastro realizado com sucesso!`);

                history.push('/loginpro');
            }
            } catch(err){
                alert(`E-mail já cadastrado, tente novamente!`);
            }
        }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="My Study Routine"/>

                    <h1>Cadastro</h1>
                    <p>Faça o seu cadastro</p>

                    <Link className="back-link" to="/loginpro">
                        <FiArrowLeft size={16} color="#1E90FF"/>
                        Voltar a página de Login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}//estamos chamando a função setName para pegar o que tem dentro do input para colocar dentro da variável name
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Repita a senha"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}