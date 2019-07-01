import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../css/main.css';

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
                        .then(res =>{
                            axios.get('/api/campuses')
                                .then(res => res.data)
                                .then(campuses => this.setState({ campuses }));
                        });
                }
            });

    }

    render() {
        var campuses = this.state.campuses;
        var styles = {
            cssFloat:'right'
        };

        return (

            <div className="col-md-9">
                <h1>Campuses Grid</h1>
                <h2>List of All Campuses ({campuses.length})
                    <Link to="/campuses/new"><button type="button" className="btn btn-primary" style={styles}>+ Add Campus</button></Link>
                </h2>

                <hr/>

                <div className="row">

                    {
                        campuses.map(campuses => {
                            return (

                                <div className="col-sm-12 col-md-12 col-lg-6" key={campuses.id}>
                                    <div className="thumbnail">
                                        <Link to={`/campuses/view/${campuses.id}`}><img className="campus_thumbnail" src={campuses.image} /></Link>
                                        <div className="caption">
                                            <h4>Campus <Link to={`/campuses/view/${campuses.id}`}>{ campuses.name } #{campuses.id}</Link></h4>
                                            <p>{campuses.students.length} Students</p>
                                            <p><Link to={`/campuses/view/${campuses.id}`}><button type="button" className="btn btn-default">View</button>
                                            </Link> <button type="button" className="btn btn-primary" onClick={this.handleClick} id={campuses.id}>Delete</button>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            );
                        })
                    }

                </div>
            </div>

        )
    }
}
