import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiCheck, FiEdit, FiX } from 'react-icons/fi';


import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo6.jpeg';

export default function Student() {
    const [students, setStudents] = useState([]);

    const history = useHistory();

    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('students', {
            headers: {
                Authorization: userEmail,
            }
        }).then(response => {
            setStudents(response.data);
        });
    }, [userEmail]);

    async function handleDeleteStudent(id) {
        try {
            await api.delete(`students/${id}`, {
                headers: {
                    Authorization: userEmail,
                }
            });

            //depois usar a font FIRA CODE - FONT LIGATURES
            setStudents(students.filter(student => (student.id !== id)));
        } catch (err) {
            alert('Erro ao deletar, tente novamente!');
        }
    }

    async function handleStudent(id, name) {
        localStorage.setItem('id_student', id);
        localStorage.setItem('name_student', name);

        history.push('/profile');
    }

    function handleProfile() {
        history.push('/profile');
    };

    return (
        <div className="list-student-container">

            <header>
                <img src={logoImg} alt="My Stdudy Routine" />
                <span>Bem vindo, {userName}</span>
                <section>
                    <Link to={"students/new"}>
                        <button className="button">Cadastrar</button>
                    </Link>
                    <Link className="button" onClick={handleProfile}>Voltar</Link>
                </section>
            </header>

            <h1>Lista de Alunos</h1>

            <div className="list-students">
                <table className="table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Matrícula</th>
                            <th>Nome</th>
                            <th>Turno</th>
                            <th>Curso</th>
                            <th>Data Retorno</th>
                            <th>Rendimento</th>
                            <th>Acões</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.registration}</td>
                                <td>{student.name}</td>
                                <td>{student.shift}</td>
                                <td>{student.course}</td>
                                <td>{student.date_finish}</td>
                                <td id="one">{student.performance}</td>
                                <td>
                                    {/* <Link to={"profile"}> */}
                                    <button onClick={() => handleStudent(student.id, student.name)} type="button">
                                        <FiCheck size={20} color="008000" />
                                    </button>
                                    {/* </Link> */}
                                    <Link to={`students/update/${student.id}/${student.registration}/${student.name}/${student.shift}/${student.course}/${student.date_start}/${student.date_finish}/${student.description}`}>
                                        <button type="button">
                                            <FiEdit size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDeleteStudent(student.id)} type="button">
                                        <FiX size={20} color="e02041" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}