import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo6.jpeg';

export default function NewSubject(props) {
    const [day, setDay] = useState('');
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [finish, setFinish] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [success, setSuccess] = useState('');



    const list = [
        { dia: 'Selecione um dia' },
        { dia: 'segunda' },
        { dia: 'terça' },
        { dia: 'quarta' },
        { dia: 'quinta' },
        { dia: 'sexta' },
        { dia: 'sábado' },
        { dia: 'domingo' },
    ];

    const history = useHistory();

    const id_student = localStorage.getItem('id_student');
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userEmail,
                Authorization_student: id_student
            }
        }).then(response => {
            setSubjects(response.data);

            setDay(props.match.params.day);

        });
    }, [userEmail]);

    async function handleNewSubject(e) {
        e.preventDefault();

        const data = {
            day,
            name,
            start,
            finish,
        };

        try {
            if (day === "") {
                alert('Por favor, selecione um dia da semana');
            } if (start > finish) {
                alert('Horário de início não pode ser maior que o horário de término!');
            } else {
                await api.post('subjects', data, {
                    headers: {
                        Authorization: id_student,
                    }
                });

                history.push('/profile');
            }
        } catch (err) {
            alert('Erro ao cadastrar disciplina!')
        }
    }

    return (
        <div className="new-subject-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="My Study Routine" />

                    <h1>Cadastrar novo horário</h1>
                    <p>Coloque o nome e os horários da disciplina</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#1E90FF" />
                        Voltar a página inical
                    </Link>
                </section>

                <form onSubmit={handleNewSubject}>
                    <select value={day} onChange={e => setDay(e.target.value)}>
                        {list.map((item, index) => (
                            <option value={item.dia}>{item.dia}</option>
                        ))}
                    </select>
                    <input
                        placeholder="Nome da disciplina"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="time"
                        placeholder="Horário de início"
                        value={start}
                        onChange={e => setStart(e.target.value)}
                    />
                    <input
                        type="time"
                        placeholder="Horário de término"
                        value={finish}
                        onChange={e => setFinish(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}