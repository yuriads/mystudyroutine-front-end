import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlusCircle, FiEdit, FiX } from 'react-icons/fi';
import logoImg from '../../assets/logo6.jpeg';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [day, setDay] = useState('');



    // const [id, setId] = useState('');
    // const [registration, setRegistration] = useState('');
    // const [name, setName] = useState('');
    // const [shift, setShift] = useState('');
    // const [course, setCourse] = useState('');
    // const [description, setDescription] = useState('');

    const history = useHistory();

    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    const id_student = localStorage.getItem('id_student');
    const name_student = localStorage.getItem('name_student');


    //o useEfect recebe dois parâmetros, o primeiro é que a função irá executar e o segundo é quando ela irá executar
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userEmail,
                Authorization_student: id_student
            },
        }).then(response => {
            setSubjects(response.data);
        });

    }, [userEmail]);

    useEffect(() => {
        api.get('profiledescription', {
            headers: {
                // Authorization: userEmail,
                Authorization_student: id_student
            },
        }).then(response => {
            setStudents(response.data);
        });
    }, [userEmail]);


    // //listando todos os estudantes cadastrados por um certo usuário
    // useEffect(() => {
    //     api.get('students', {
    //         headers: {
    //             Authorization: userEmail,
    //         }
    //     }).then(response => {
    //         setStudents(response.data);

    //         //setId();
    //         // setRegistration(students.registration);
    //         // setName(students.name);
    //         // setShift(students.shift);
    //         // setCourse(students.course);
    //         // setDescription(students.description);

    //     });
    // }, [userEmail]);

    async function handleDeleteSubject(id) {
        try {
            await api.delete(`subjects/${id}`, {
                headers: {
                    Authorization: id_student,
                },

            });

            //depois usar a font FIRA CODE - FONT LIGATURES
            setSubjects(subjects.filter(subject => (subject.id !== id)));
        } catch (err) {
            alert('Erro ao deletar, tente novamente!');
        }
    }


    async function handleDeleteRoutine() {
        try {
            await api.delete(`profiledeleteroutine`, {
                headers: {
                    Authorization_student: id_student,
                    Authorization: userEmail,
                },

            });

            //depois usar a font FIRA CODE - FONT LIGATURES
            //setSubjects(subjects.filter(subject => (subject.id !== id)));
        } catch (err) {
            alert('Erro ao deletar, tente novamente!');
        }
        window.location.reload();
    }


    function handleLogout() {
        localStorage.clear();

        history.push('/loginpro');
    };

    // function handleSelectStudent(e) {
    //     students.map(student => (
    //         setId(student.id)
    //     ))
    // }



    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="My Stdudy Routine" />
                <span>Bem vindo, {userName}</span>
                <section>
                    <Link> <button className="button" onClick={handleDeleteRoutine}>Limpar R.</button></Link>
                    {/* <Link className="button">Relatório</Link> */}
                    <Link to={'/students'}>
                        <button className="button">Alunos</button>
                    </Link>
                    <Link className="button" onClick={handleLogout}>Sair</Link>
                </section>
            </header>

            <h1>Aluno: {name_student}</h1>
            {/* <h2>Semana 1</h2> */}

            {/* <div className="aluno">

                <select onClick={handleSelectStudent}>
                    <option disabled selected>
                        Selecione um aluno
                    </option>
                    {students.map(student => (

                        <option value={students}>{student.name}</option>
                    ))}
                </select>

                <Link to={'/students/new'}>
                    <buttton className="button">Cadastrar</buttton>
                </Link>

                <Link to={`/students/update/${id}`}>
                    <buttton className="button">Atualizar</buttton>
                </Link>

                <Link to={'/students/new'}>
                    <buttton className="button">Deletar</buttton>
                </Link>

                <Link to={'/students/new'}>
                    <buttton className="button">Imprimir</buttton>
                </Link>
            </div> */}

            <h2>Rotina de estudo</h2>

            <div className="dia-semana">

                <div >
                    <table>
                        <caption>Segunda</caption>
                        <thead>
                            {/* <h2>Segunda</h2> */}
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
                                <th>
                                    <Link to={`/subjects/new/${'segunda'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {subjects.filter(subject => (subject.day === "segunda"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <table>
                        <caption>Terça</caption>
                        <thead>
                            {/* <h2>Terça</h2> */}
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
                                <th>
                                    <Link to={`/subjects/new/${'terça'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {subjects.filter(subject => (subject.day === "terça"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <table>
                        <caption>Quarta</caption>
                        <thead>
                            {/* <h2>Quarta</h2> */}
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
                                <th>
                                    <Link to={`/subjects/new/${'quarta'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.filter(subject => (subject.day === "quarta"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <table>
                        <caption>Quinta</caption>
                        <thead>
                            {/* <h2>Quinta</h2> */}
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
                                <th>
                                    <Link to={`/subjects/new/${'quinta'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.filter(subject => (subject.day === "quinta"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <table>
                        <caption>Sexta</caption>
                        <thead>
                            {/* <h2>Sexta</h2> */}
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
                                <th>
                                    <Link to={`/subjects/new/${'sexta'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.filter(subject => (subject.day === "sexta"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <table>
                        <caption>Sábado</caption>
                        <thead>
                            {/* <h2>Sábado</h2> */}
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
                                <th>
                                    <Link to={`/subjects/new/${'sábado'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.filter(subject => (subject.day === "sábado"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <table>
                        <caption>Domingo</caption>
                        <thead>
                            {/* <h2>Domingo</h2> */}
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
                                <th>
                                    <Link to={`/subjects/new/${'domingo'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.filter(subject => (subject.day === "domingo"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className="obs">
                        <h2>Observções</h2>
                        {/* <textarea name="" id="" cols="30" rows="5"> */}
                        <div className="aluno">

                            <table>
                                <tbody>
                                    <label>
                                        {students.map(student => (
                                            student.description
                                        ))}
                                    </label>
                                </tbody>
                            </table>
                        </div>
                        {/* </textarea> */}
                        {/* <button className="button">Adicionar Obs</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}