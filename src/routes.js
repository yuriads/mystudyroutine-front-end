import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// import Home from './pages/Home';
import Logon from './pages/Logon';
import LogonStudent from './pages/LogonStudent';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Routine from './pages/Routine'
import NewSubject from './pages/NewSubject';
import UpdateSubject from './pages/UpdateSubject';
import Student from './pages/Student';
import NewStudent from './pages/NewStudent';
import UpdateStudent from './pages/UpdateStudent';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route path="/" exact component={Home} /> */}

                {/* <Route path="/login" component={LogonStudent} /> */}
                <Route path="/" exact component={LogonStudent} />

                <Route path="/loginpro" component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/routine" component={Routine} />
                
                <Route path="/profile" component={Profile} />

                <Route path="/subjects/new/:day" component={NewSubject} />
                <Route path="/subjects/update/:id/:day/:name/:start/:finish" component={UpdateSubject} />

                <Route path="/students" exact component={Student}/>
                <Route path="/students/new" component={NewStudent} />
                <Route path="/students/update/:id/:registration/:name/:shift/:course/:date_start/:date_finish/:description" component={UpdateStudent} />

            </Switch>
        </BrowserRouter>
    );
}