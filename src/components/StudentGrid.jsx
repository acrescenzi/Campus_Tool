import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Student extends Component{
    constructor(){
        super();
        this.state={students:[]};
        this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount () {
        axios.get('/api/students')
            .then(res => res.data)
            .then(students => this.setState({ students }));
    }

    handleClick(e){
        console.log("clickTarg",e.target.id);
        axios({
            method: 'delete',
            url: '/api/students/'+e.target.id
        })
            .then(res =>{
                console.log('change state',res);
                //cannot push to the same path must modify state
                // this.props.history.push('/campuses');
                // this.setState({ campuses });


                // could not do another query on the server side
                // please see api
                axios.get('/api/students')
                    .then(res => res.data)
                    .then(students => this.setState({ students }));
            });
    }

    render() {
        var students = this.state.students;
        var styles = { cssFloat:'right' };
        var stylesImg={ width:'64px' };

        return (

            <div className="col-md-9">
                <h1>Students Grid</h1>
                <h2>List of All Students ({students.length})
                    <Link to="/students/new"><button type="button" className="btn btn-primary" style={styles}>+ Add Student</button></Link>
                </h2>

                <hr />

                {
                    students.map(students => {
                        return (

                        <div className="col-sm-6 col-md-4" key={students.id}>
                            <div className="thumbnail">
                                <Link to={`/students/view/${students.id}`}><img src={students.image} /></Link>
                                <div className="caption">
                                    <h4><Link to={`/students/view/${students.id}`}>#{students.id} { students.firstName } { students.lastName } </Link></h4>
                                    <p>on <Link to={`/campuses/view/${students.campus.id}`}>Campus {students.campus.name}</Link></p>
                                    <p>{students.email}</p>
                                    <p><Link to={`/students/view/${students.id}`}><button type="button" className="btn btn-default">View</button></Link>                                       <button type="button" className="btn btn-primary" onClick={this.handleClick} id={students.id}>Delete</button>
                                    </p>
                                </div>
                            </div>
                        </div>

                        );
                    })
                }

            </div>

        )
    }
}
