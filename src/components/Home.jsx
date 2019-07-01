import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../css/main.css';

export default class Home extends Component{
    render() {
        return (
            <div>
                <h1>Welcome to Senior Enrichment</h1><br />


                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="thumbnail">
                      <img className="homeImage" src="http://wcsc.ucsd.edu/images/group/group1.JPG" alt="Female College Student"></img>
                      <div className="caption">
                        <h3>Students</h3>
                        <p>Meet the students</p>
                        <Link to="/students" className="btn btn-primary" role="button">Students</Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="thumbnail">
                      <img className="homeImage" src="https://salve.edu/sites/default/files/SalveCampus_OchreCourt-0955.jpg" alt="image of typical campus"></img>
                      <div className="caption">
                        <h3>Campuses</h3>
                        <p>Campuses ...</p>
                        <Link to="/campuses" className="btn btn-primary" role="button">Campuses</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">

                </div>
            </div>
        )
    }
}
