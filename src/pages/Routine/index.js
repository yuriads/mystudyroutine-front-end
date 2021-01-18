import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiThumbsUp } from 'react-icons/fi';
import logoImg from '../../assets/logo6.jpeg';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [subjects, setSubjects] = useState([]);
    const [rendimento, setRendimento] = useState('')
    const [students, setStudents] = useState([]);
    const [day, setDay] = useState('');



    // const [id, setId] = useState('');
    // const [registration, setRegistration] = useState('');
    // const [name, setName] = useState('');
    // const [shift, setShift] = useState('');
    // const [course, setCourse] = useState('');
    // const [description, setDescription] = useState('');

    const history = useHistory();

    const userName = localStorage.getItem('userNameStudent');
    const userId = localStorage.getItem('userId');

    // const id_student = localStorage.getItem('id_student');
    // const name_student = localStorage.getItem('name_student');


    //o useEfect recebe dois parâmetros, o primeiro é que a função irá executar e o segundo é quando ela irá executar


    useEffect(() => {
        api.get('profiledescription', {
            headers: {
                // Authorization: userEmail,
                Authorization_student: userId,
            },
        }).then(response => {
            setStudents(response.data);
        });
    }, [userId]);


    students.map(student => (
        student.date_start
    ))

    useEffect(() => {
        api.get('profilestudent', {
            headers: {
                Authorization_student: userId,
                // Authorization_student: id_student
            },
        }).then(response => {
            setSubjects(response.data);
        });
    }, [userId]);


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

    // async function handleDeleteSubject(id) {
    //     try {
    //         await api.delete(`subjects/${id}`, {
    //             headers: {
    //                 Authorization: id_student,
    //             },
    //         });

    //         //depois usar a font FIRA CODE - FONT LIGATURES
    //         setSubjects(subjects.filter(subject => (subject.id !== id)));
    //     } catch (err) {
    //         alert('Erro ao deletar, tente novamente!');
    //     }
    // }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    };

    // function handleSelectStudent(e) {
    //     students.map(student => (
    //         setId(student.id)
    //     ))
    // }

    async function onClick(id, day, start, disable) {
        //alert(start)

        const start_verificar1 = start.substr(0, 2);
        const start_verificar2 = parseInt(start.substr(-2)) + 10;
        //start_verificar.setMinutes(start.getMinutes() + 10);

        const start_verificar = (start_verificar1 + ':' + start_verificar2);

        const hoje = new Date;
        const day1 = hoje.getDay();
        let day2 = '';
        let hours = 0;
        let minutes = 0;
        let start1 = '';

        if (hoje.getHours() < 10 && hoje.getMinutes() < 10) {
            hours = '0' + hoje.getHours();
            minutes = '0' + hoje.getMinutes();
            start1 = hours + ':' + minutes;
        } else if (hoje.getHours() < 10 && hoje.getMinutes() >= 10) {
            hours = '0' + hoje.getHours();
            start1 = hours + ':' + hoje.getMinutes();
        } else if (hoje.getHours() >= 10 && hoje.getMinutes() < 10) {
            minutes = '0' + hoje.getMinutes();
            start1 = hoje.getHours() + ':' + minutes;
        } else {
            start1 = hoje.getHours() + ':' + hoje.getMinutes();
        }

        // alert(id)
        // alert(hours)
        // alert(minutes)
        // alert(typeof (parseInt(disable)))
        // alert(disable);
        //alert(typeof(id))
        // alert(minutes);
        // alert(typeof(minutes));
        // alert(hoje.getMinutes())
        // alert(start1);
        // alert(typeof(start1));
        // alert(start);
        // alert(day1)
        // alert(day)
        // alert(typeof(start_verificar1));
        // alert(start_verificar1);
        // alert(start_verificar1.substr(2));
        // alert(start_verificar2);
        // alert(start_verificar);

        switch (day1) {
            case 0:
                day2 = 'domingo';
                break;
            case 1:
                day2 = 'segunda';
                break;
            case 2:
                day2 = 'terça';
                break;
            case 3:
                day2 = 'quarta';
                break;
            case 4:
                day2 = 'quinta';
                break;
            case 5:
                day2 = 'sexta';
                break;
            case 6:
                day2 = 'sábado';
                break;
            default:
                alert('Erro ao selecionar dia');
        }

        //alert(day2);

        if (day !== day2) {
            alert("Hoje é " + day2);
            return;
        } else if (day === day2 && start1 < start) {
            alert('Ainda não está no horário de iniciar a disciplina!')
            return;
        } else if (day === day2 && start1 >= start_verificar) {
            alert('Passou do horário limite para inicar a disciplina!');
            try {
                await api.put(`profilestudentdisable/${id}`, 1, {
                    headers: {
                        Authorization_student: userId,
                    }
                });
                window.location.reload();

                //setSubjects(subjects.filter(subject => (subject.id !== id)));
            } catch (err) {
                alert('Erro ao desabilitar disciplina');
            }
            window.location.reload();
            return;
        }

        if (day === day2 && start1 < start_verificar && start1 >= start) {
            try {
                await api.put('profilestudent', 0, {
                    headers: {
                        Authorization_student: userId,
                    }
                });

                alert("Parabéns, sua performace melhorou!")
                window.location.reload()

            } catch (err) {
                alert('Erro ao atualizar performance!')
            }
        }

        try {
            await api.put(`profilestudentdisable/${id}`, 1, {
                headers: {
                    Authorization_student: userId,
                }
            });
            window.location.reload();

            //setSubjects(subjects.filter(subject => (subject.id !== id)));
        } catch (err) {
            alert('Erro ao desabilitar disciplina');
        }
        window.location.reload();

    }

    async function performance(performace) {
        try {
            await api.get('studentcontrollerperformance', {
                headers: {
                    Authorization_student: userId,
                }
            }).then(response => {
                setRendimento(response.data);
                alert('Seu rendimento está em ' + response.data + '%');
            });
        } catch (err) {
            alert('Erro ao informar rendimento!')
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="My Stdudy Routine" />
                <span>Bem vindo, {userName}</span>
                <section>
                    <Link className="button" onClick={performance}>Rendimento</Link>
                    {/* <Link to={'/students'}>
                        <button className="button">Alunos</button>
                    </Link> */}
                    <Link className="button" onClick={handleLogout}>Sair</Link>
                </section>
            </header>


            <h2>Rotina de estudo</h2>
            <h3>Semana</h3>

            <div className="rotina-semana">
                <button className="button">1</button>
                <button className="button">2</button>
                <button className="button">3</button>
                <button className="button">4</button>
            </div>

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
                                {/* <th>
                                    <Link to={`/subjects/new/${'segunda'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {subjects.filter(subject => (subject.day === "segunda"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        {/* <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                            s        <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td> */}
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => onClick(subject.id, subject.day, subject.start, subject.disable)}
                                                disabled={subject.disable === 1}
                                            >
                                                <FiThumbsUp size={20} color="008000" />
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
                                {/* <th>
                                    <Link to={`/subjects/new/${'terça'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {subjects.filter(subject => (subject.day === "terça"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        {/* <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td> */}
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => onClick(subject.id, subject.day, subject.start, subject.disable)}
                                                disabled={subject.disable === 1}
                                            >
                                                <FiThumbsUp size={20} color="008000" />
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
                                {/* <th>
                                    <Link to={`/subjects/new/${'quarta'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.filter(subject => (subject.day === "quarta"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        {/* <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td> */}
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => onClick(subject.id, subject.day, subject.start, subject.disable)}
                                                disabled={subject.disable === 1}
                                            >
                                                <FiThumbsUp size={20} color="008000" />
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
                                {/* <th>
                                    <Link to={`/subjects/new/${'quinta'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.filter(subject => (subject.day === "quinta"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        {/* <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td> */}
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => onClick(subject.id, subject.day, subject.start, subject.disable)}
                                                disabled={subject.disable === 1}
                                            >
                                                <FiThumbsUp size={20} color="008000" />
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
                                {/* <th>
                                    <Link to={`/subjects/new/${'sexta'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.filter(subject => (subject.day === "sexta"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        {/* <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td> */}
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => onClick(subject.id, subject.day, subject.start, subject.disable)}
                                                disabled={subject.disable === 1}
                                            >
                                                <FiThumbsUp size={20} color="008000" />
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
                                {/* <th>
                                    <Link to={`/subjects/new/${'sábado'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.filter(subject => (subject.day === "sábado"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        {/* <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td> */}
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => onClick(subject.id, subject.day, subject.start, subject.disable)}
                                                disabled={subject.disable === 1}
                                            >
                                                <FiThumbsUp size={20} color="008000" />
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
                                {/* <th>
                                    <Link to={`/subjects/new/${'domingo'}`}>
                                        <button type="button">
                                            <FiPlusCircle size={20} color="1E90FF" />
                                        </button>
                                    </Link>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.filter(subject => (subject.day === "domingo"))
                                .map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.start}</td>
                                        <td>{subject.finish}</td>
                                        {/* <td>
                                            <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                                <button type="button">
                                                    <FiEdit size={20} color="1E90FF" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                                <FiX size={20} color="e02041" />
                                            </button>
                                        </td> */}
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => onClick(subject.id, subject.day, subject.start, subject.disable)}
                                                disabled={subject.disable === 1}
                                            >
                                                <FiThumbsUp size={20} color="008000" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}