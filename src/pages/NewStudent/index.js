import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo6.jpeg';

export default function NewStudent() {
    const [registration, setRegistration] = useState('');
    const [name, setName] = useState('');
    const [shift, setShift] = useState('');
    const [course, setCourse] = useState('');
    const [date_start, setDate_start] = useState('');
    const [date_finish, setDate_finish] = useState('');
    const [description, setDescription] = useState('');
    const [students, setStudents] = useState([]);

    const list_shift = [
        { shift: 'Selecione um turno' },
        { shift: 'Manhã' },
        { shift: 'Tarde' },
        { shift: 'Noite' },
    ];

    const list_course = [
        { course: 'Selecione um curso' },
        { course: 'Médio integrado com Informática' },
        { course: 'Médio integrado com Meio Ambiente' },
        { course: 'Subsequente de Informática' },
    ];

    const history = useHistory();

    const userEmail = localStorage.getItem('userEmail');


    async function handleNewStudent(e) {
        e.preventDefault();

        const data = {
            registration,
            name,
            shift,
            course,
            date_start,
            date_finish,
            description,
        };

        try {
            const response = await api.post('students', data, {
                headers: {
                    Authorization: userEmail,
                }

            });

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/students');

        } catch (err) {
            alert('Erro ao cadastrar estudante!')
        }
    }

    return (
        <div className="new-student-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="My Study Routine" />

                    <h1>Cadastrar Novo Aluno</h1>
                    <p>Coloque os dados do aluno</p>

                    <Link className="back-link" to="/students">
                        <FiArrowLeft size={16} color="#1E90FF" />
                        Voltar para lista de alunos
                    </Link>
                </section>

                <form onSubmit={handleNewStudent}>
                    <input
                        placeholder="Matrícula"
                        value={registration.toUpperCase()}
                        onChange={e => setRegistration(e.target.value)}
                    />
                    <input
                        placeholder="Nome do aluno"
                        value={name.toUpperCase()}
                        onChange={e => setName(e.target.value)}
                    />
                    <select value={shift} onChange={e => setShift(e.target.value)}>
                        {list_shift.map((item, index) => (
                            <option value={item.shift}>{item.shift}</option>
                        ))}
                    </select>
                    <select value={course} onChange={e => setCourse(e.target.value)}>
                        {list_course.map((item, index) => (
                            <option value={item.course}>{item.course}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        placeholder="Data início"
                        value={date_start}
                        onChange={e => setDate_start(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Data Término"
                        value={date_finish}
                        onChange={e => setDate_finish(e.target.value)}
                    />
                    <textarea rows='100'
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}