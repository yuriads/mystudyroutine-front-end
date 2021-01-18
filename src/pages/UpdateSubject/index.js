import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo6.jpeg';

export default function UpdateSubject(props) {
    const [day, setDay] = useState('');
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [finish, setFinish] = useState('');
    const [success, setSuccess] = useState('');
    const [subjects, setSubjects] = useState([]);

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

            // subjects.filter(subject => (subject.id == props.match.params.id))
            //     .map(subject => (
            //         setDay(subject.day),
            //         setName(subject.name),
            //         setStart(subject.start),
            //         setFinish(subject.finish)
            // ))
            
            setDay(props.match.params.day);
            setName(props.match.params.name);
            setStart(props.match.params.start);
            setFinish(props.match.params.finish);

        });
    }, [userEmail]);

    async function handleUpdateSubject(e) {
        e.preventDefault();

        const id = props.match.params.id;

        const data = {
            id,
            day,
            name,
            start,
            finish,
        };

        try {
            if (day === "") {
                alert('Por favor, selecione um dia da semana');
            } else {
                await api.put(`subjects/${id}`, data, {
                    headers: {
                        Authorization: id_student,
                    }
                });

                history.push('/profile');
            }
        } catch (err) {
            alert('Erro ao atualizar disciplina!')
        }
    }

    return (
        <div className="new-subject-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="My Study Routine" />

                    <h1>Atualizar um horário</h1>
                    <p>Coloque o nome e os horários da disciplina</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#1E90FF" />
                        Voltar a página inical
                    </Link>
                </section>

                <form onSubmit={handleUpdateSubject}>
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

                    <button className="button" type="submit">Atualizar</button>
                </form>
            </div>
        </div>
    );
}