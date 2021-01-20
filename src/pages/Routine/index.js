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

    const history = useHistory();

    const userName = localStorage.getItem('userNameStudent');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('profiledescription', {
            headers: {
                Authorization_student: userId,
            },
        }).then(response => {
            setStudents(response.data);
        });
    }, [userId]);

    useEffect(() => {
        api.get('profilestudent', {
            headers: {
                Authorization_student: userId,
            },
        }).then(response => {
            setSubjects(response.data);
        });
    }, [userId]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    };

    async function onClick(id, day, start, disable) {

        const start_verificar1 = start.substr(0, 2);
        const start_verificar2 = parseInt(start.substr(-2)) + 10;

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

    async function onClickWeek() {
        try {
            await api.put(`profileweek`, 0, {
                headers: {
                    Authorization_student: userId,
                }
            });
            let weekDisable = students.week + 2;
            alert("Você iniciou a semana " + weekDisable);
            window.location.reload();

        } catch (err) {
            alert('Erro ao atualizar semana');
        }
        window.location.reload();
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="My Stdudy Routine" />
                <span>Bem vindo, {userName}</span>
                <section>
                    <Link className="button" onClick={performance}>Rendimento</Link>
                    <Link className="button" onClick={handleLogout}>Sair</Link>
                </section>
            </header>


            <h2>Rotina de estudo</h2>
            <h3>Semana</h3>

            <div className="rotina-semana">
                <button
                    className="button"
                    onClick={() => onClickWeek()}
                    disabled={students.week >= 0}
                >1</button>
                <button className="button"
                    className="button"
                    onClick={() => onClickWeek()}
                    disabled={students.week >= 1}
                >2</button>
                <button className="button"
                    className="button"
                    onClick={() => onClickWeek()}
                    disabled={students.week >= 2}
                >3</button>
                <button className="button"
                    className="button"
                    onClick={() => onClickWeek()}
                    disabled={students.week >= 3}
                >4</button>

            </div>

            <div className="dia-semana">

                <div >
                    <table>
                        <caption>Segunda</caption>
                        <thead>
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
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
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
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
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
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
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
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
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
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
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
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
                            <tr>
                                <th>Disciplina</th>
                                <th>Início</th>
                                <th>Término</th>
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