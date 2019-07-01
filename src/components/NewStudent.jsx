import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class NewStudent extends Component{
    constructor (props){
        super(props);
        this.state={
            campuses:[],
            student:{}
        };

        let formPath=this.props.history.location.pathname;
        this.formNew=(formPath==="/students/new");

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount(){
        // if edit state, get student data
        if(!this.formNew){
            var studentId = this.props.match.params.studentId;

            axios.all([
                axios.get('/api/campuses'),
                axios.get(`/api/students/${studentId}`)
            ])
            .then(axios.spread((campuses, student) => {
                campuses=campuses.data;
                student=student.data[0];
                this.setState({ campuses, student  });
            }));
        }
        else{
            axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => this.setState({ campuses: campuses }));
        }
    }

    // for pre-populated form fields
    // not working!
    handleChange (e) {
        var formEle=e.target.id;
        var eleValue=e.target.value;
        if(formEle==='studentFirst'){
            this.setState({firstName: eleValue});
        }
        else if(formEle==='studentLast'){
            this.setState({lastName: eleValue});

        }
        else if(formEle==='studentEmail'){
            this.setState({email: eleValue});

        }
        else if(formEle==='studentImage'){
            this.setState({image: eleValue});

        }
        else if(formEle==='studentCampus'){
            this.setState({campusId: eleValue});
        }
        else{
            //do nothing
        }
    }

    handleSubmit(e){
        e.preventDefault();

        let formObj=e.target;
        let studentFirst=formObj[0].value;
        let studentLast=formObj[1].value;
        let studentEmail=formObj[2].value;
        let studentImage=formObj[3].value;
        let studentCampus=formObj[4].value;

        // creating new student
        if(this.formNew) {
          let old_this = this;
          axios.post('/api/students/new', {
            firstName: studentFirst,
            lastName: studentLast,
            email: studentEmail,
            image: studentImage,
            campusId: studentCampus
            })
            .then(function (response) {
              console.log(response);
              alert("Add Status: " + response.data);
              console.log(old_this);
              old_this.props.history.push('/students');
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        // editing existing student
        else{
            let studentId=this.state.student.id;

            // handle for blanks
            studentFirst=(studentFirst==='')?this.state.student.firstName:studentFirst;
            studentLast=(studentLast==='')?this.state.student.lastName:studentLast;
            studentEmail=(studentEmail==='')?this.state.student.email:studentEmail;
            studentImage=(studentImage==='')?this.state.student.image:studentImage;
            studentCampus=(studentCampus==='')?this.state.student.campusId:studentCampus;

            axios({
                method: 'put',
                url: '/api/students/edit/'+studentId,
                data: {
                    firstName: studentFirst,
                    lastName: studentLast,
                    email: studentEmail,
                    image: studentImage,
                    campusId: studentCampus
                }
            })
            .then(res =>{
                this.props.history.push('/students/view/'+studentId);
            });
        }
    }

    render() {
        var student=this.state.student;
        var studentFirst=(this.formNew) ? 'First Name' : student.firstName;
        var studentLast=(this.formNew) ? 'Last Name' : student.lastName;
        var studentEmail=(this.formNew) ? 'name@email.com' : student.email;
        var studentImage=(this.formNew) ? 'https://www.fillmurray.com/200/200' : student.image;
        var studentCampus=(this.formNew) ? 'Last Name' : student.campusId;
        var campuses=this.state.campuses;
        return (

            <div key="newcamp" className="col-md-6">
                <h1>Students</h1>
                {
                    this.formNew ?  (<h2>Add New Student</h2>) : (<h2>Edit Student</h2>)
                }

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="studentFirst">First Name</label>
                        <input type="text" className="form-control" id="studentFirst"
                               defaultValue={this.formNew ?  ('First Name') : (studentFirst)}
                               placeholder={this.formNew ?  ('First Name') : (studentFirst)}
                               // value={this.formNew ?  ('First Name') : (studentFirst)}
                               // onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label for="studentLast">Last Name</label>
                        <input type="text" className="form-control" id="studentLast"
                               defaultValue={this.formNew ?  ('Last Name') : (studentLast)}
                               placeholder={this.formNew ?  ('Last Name') : (studentLast)}
                               // value={this.formNew ?  ('Last Name') : (studentLast)}
                               // onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label for="studentEmail">Email</label>
                        <input type="email" className="form-control" id="studentEmail" aria-describedby="emailHelp"
                               defaultValue={this.formNew ?  ('name@email.com') : (studentEmail)}
                               placeholder={this.formNew ?  ('name@email.com') : (studentEmail)}
                               // value={this.formNew ?  ('name@email.com') : (studentEmail)}
                               // onChange={this.handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="studentImage">Image</label>
                        <input type="text" className="form-control" id="studentImage"
                               defaultValue={this.formNew ?  ('http://lorempixel.com/200/200/nature/') : (studentImage)}
                               placeholder={this.formNew ?  ('http://lorempixel.com/200/200/nature/') : (studentImage)}
                               // value={this.formNew ?  ('http://lorempixel.com/252/200/nature/') : (studentImage)}
                               // onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleSelect1">Campus</label>
                        <select className="form-control" id="studentCampus">
                            {
                                campuses.map(campuses => {
                                    return (
                                        campuses.id===studentCampus ?
                                        (<option key={campuses.id} value={campuses.id} selected>{campuses.name}</option>)
                                        :
                                        (<option key={campuses.id} value={campuses.id}>{campuses.name}</option>)
                                    );
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        )
    }
}
