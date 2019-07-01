import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../css/main.css';

export default class SingleCampus extends Component{
    constructor(){
        super();
        this.state={
            campus:{},
            students:[]
        };
        this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount () {
        var campusId = this.props.match.params.campusId;

        axios.all([
            axios.get(`/api/campuses/${campusId}`),
            axios.get(`/api/campuses/${campusId}/students`)
        ])
        .then(axios.spread((campus, students) => {
            campus=campus.data[0];
            students=students.data;
            this.setState({ campus, students  });
        }));
    }

    handleClick(e){
        axios({
            method: 'delete',
            url: '/api/students/'+e.target.id
        })
        .then(res =>{
            axios.get(`/api/campuses/${this.state.campus.id}/students`)
            .then(res => res.data)
            .then(students => this.setState({ students }));
        });

    }

    render() {
        var campus=this.state.campus;
        var students=this.state.students;
        var styles = { cssFloat:'right' };
        var stylesImg={ width:'65px' };
        return (

            <div key={ campus.id }  className="col-md-9">
                <div className="page-header">
                    <h1>Campus: { campus.name } <Link to={`/campuses/edit/${campus.id}`}>
                        <button type="button" className="btn btn-lg btn-primary" style={styles}>Edit</button>
                    </Link></h1>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <img className="bootstrap_img" src={ campus.image }/>
                    </div>

                    <div className="col-md-6">
                        <ul>
                            <li>{ campus.name } Fact #1</li>
                            <li>{ campus.name } Fact #2</li>
                            <li>{ campus.name } Fact #3</li>
                            <li>{ campus.name } Fact #4</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-header">
                            <h2>All Students in { campus.name } Campus ({students.length})
                                <Link to="/students/new">
                                    <button type="button" className="btn btn-primary" style={styles}>+ Add Student</button>
                                </Link>
                            </h2>
                        </div>

                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Campus</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                students.map(students => {
                                    return (
                                        <tr key={students.id}>
                                            <td>{ students.id }</td>
                                            <td><Link
                                                to={`/students/view/${students.id}`}>{ `${students.firstName} ${students.lastName}`}</Link>
                                            </td>
                                            <td><Link
                                                to={`/campuses/view/${students.campus.id}`}>{ students.campus.name }</Link>
                                            </td>
                                            <td>{ students.email }</td>
                                            <td>{`@${students.firstName}`}</td>
                                            <td className="text-right"><button type="button" onClick={this.handleClick} id={students.id} className="btn btn-xs btn-danger">delete</button></td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}
