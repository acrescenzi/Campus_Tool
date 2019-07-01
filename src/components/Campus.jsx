import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Campus extends Component{
    constructor(){
        super();
        this.state={
            campuses:[]
        };

        this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount () {
        axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => this.setState({ campuses }));
    }

    handleClick(e){
        var campusId=e.target.id;

        // if campus has students
        // do not delete if students
        axios.get(`/api/campuses/${campusId}/students`)
        .then(students=>{
            if(students.data.length){
                alert('This campus still has students! Move them to a different campus before deleting!');
            }
            else{
                axios({
                    method: 'delete',
                    url: '/api/campuses/'+campusId
                })
                .then(res => {
                    axios.get('/api/campuses')
                        .then(res => res.data)
                        .then(campuses => this.setState({ campuses }));
                });
            }
        });

    }

    render() {
        var campuses = this.state.campuses;
        var styles = { cssFloat:'right' };

        return (

            <div className="col-md-9">

                <h1>All Campuses<Link to="/campuses/new">list view</Link>/<Link to="/campuses/new">grid view</Link></h1>
                <h2>List of All Campuses ({campuses.length})
                    <Link to="/campuses/new"><button type="button" className="btn btn-primary" style={styles}>+ Add Campus</button></Link>
                </h2>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Campus Name</th>
                        <th># Students</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        campuses.map(campuses => {
                            return (
                                <tr key={campuses.id}>
                                    <td>{ campuses.id }</td>
                                    <td><Link className="campus_thumbnail" to={`/campuses/view/${campuses.id}`}>{ campuses.name }</Link></td>
                                    <td>{campuses.students.length}</td>
                                    <td className="text-right"><button type="button" className="btn btn-xs btn-danger" onClick={this.handleClick} id={campuses.id}>delete</button></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>

            </div>

        )
    }
}
