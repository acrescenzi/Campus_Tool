'use strict';

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is requeired everywhere

const User = require('./user');
const Campus = require('./campus');
const Student = require('./student');

//do relationships here
Student.belongsTo(Campus);
Campus.hasMany(Student);

// When deleting a Campus do we delete the students? Or how do we modify their campusIDs? Using a default ID?
// Do not allow a Campus deletion until there are no students associated with it?

module.exports = {User,Campus,Student};

