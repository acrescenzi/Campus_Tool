import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SingleStudent extends Component{
    constructor(){
        super();
        this.state={student:[]};
    }

    componentDidMount () {
        var studentId = this.props.match.params.studentId;
        axios.get(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(student => {
            this.setState({ student });
        });
    }

    render() {
        var student=this.state.student;
        var styles = { cssFloat:'right' };

        return (
            <div className="col-md-9">
                {
                    student.map(student => {
                        return (
                            <div key={ student.id }>
                                <div className="page-header">
                                    <h1>Student: { `${student.firstName} ${student.lastName}`}
                                        <Link to={`/students/edit/${student.id}`}>
                                            <button type="button" className="btn btn-lg btn-primary" style={styles}>Edit</button>
                                        </Link>
                                    </h1>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <img className="bootstrap_img" src={ student.image } />
                                    </div>

                                    <div className="col-md-4">
                                        <ul>
                                            <li>{ `${student.firstName} ${student.lastName}`}</li>
                                            <li>{ student.email }</li>
                                            <li><Link to={`/campuses/view/${student.campus.id}`}>{ student.campus.name } Campus</Link></li>
                                        </ul>
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
