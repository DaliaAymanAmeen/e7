const express = require ('express');
const Joi = require('joi'); // for validation 

const app = express();

const fs = require('fs');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));


const courses = [
{id: 1, name: 'course1', code:'CSE101', description: 'Computer System'},
{id: 2, name: 'course2', code:'CSE201', description: 'Electrical Lab'},
];


//environment variables 
const port = process.env.PORT || 3000; 
app.listen(3000, ()=> console.log(`just listening ${port}`));


//get method to retriave all courses
app.get('/api/courses', (req, res) =>
{
	res.send(courses);
});

//get method to retriave a specific course with matching id
app.get('/api/courses/:id', (req, res) =>
{
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course)	return res.status(404).send('not found');
	res.send(course);	
});


// function for validation that can be used in both POST & PUT method
function validateCourse(course)
{
	const schema = 
	{
		name: Joi.string().min(3).required(),
		code: Joi.string().required().regex(/^[A-Za-z]{3}[0-9]{3}$/), 
		description: Joi.string().max(200).optional()
		
	};
	
	return Joi.validate(course, schema);		
}

// post method to add new course
app.post('/api/courses', (req, res) =>
{	
	const { error } = validateCourse(req.body);		
	console.log(error);
	
	if (error)	return res.status(400).send(error.details[0].message);
	
	
	const course = 
	{
		id: courses.length + 1,
		name: req.body.name,
		code: req.body.code,
		description: req.body.description	
	};
	
	courses.push(course);
	res.send(course);
});

// post method to add new course
app.post('/web/courses/create', (req, res) =>
{	
	const { error } = validateCourse(req.body);		
	console.log(error);
	
	if (error)	return res.status(400).send(error.details[0].message);
	
	
	const course = 
	{
		id: courses.length + 1,
		name: req.body.name,
		code: req.body.code,
		description: req.body.description	
	};
	
	courses.push(course);
	res.send(course);
	//res.sendFile(path.join(__dirname+'/form.html'));
});


// put method to update a specific course
app.put('/api/courses/:id', (req, res) =>
{	
	//look up the course , if not existing return 404	
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course)	 return res.status(404).send('not found');
	
	//Validate
	//const result = validateCourse(req.body);	
	const { error } = validateCourse(req.body);	
	if (error)	return res.status(400).send(error.details[0].message);


	//Update course, return the updated course 
	course.name = req.body.name;
	course.code = req.body.code;
	course.description = req.body.description;
	res.send(course);
		
});


app.delete('/api/courses/:id', (req, res) =>
{	
	//look up the course , if not existing return 404	
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course)	 return res.status(404).send('not found');
	
	//Delete
	const index = courses.indexOf(course);
	courses.splice(index, 1);
	
	res.send(course);
});





const students = [
{id: 1, name: 'Ahmed Ayman', code:'1600500'},
{id: 2, name: 'Dalia Ayman', code:'1600521'},
];


//get method to retriave all students
app.get('/api/students', (req, res) =>
{
	res.send(students);
});

//get method to retriave a specific student with matching id
app.get('/api/students/:id', (req, res) =>
{
	const student = students.find(c => c.id === parseInt(req.params.id));
	if (!student)	return res.status(404).send('not found');
	res.send(student);	
});


// function for validation that can be used in both POST & PUT method
function validateStudent(student)
{
	const schema = 
	{
		name: Joi.string().required().regex(/^[A-Za-z ]+((['][A-Za-z ]+)*||([-][A-Za-z ]+)*)*$/),
		code: Joi.string().required().regex(/^[0-9]{7}$/)
	
	};
	
	return Joi.validate(student, schema);		
}

// post method to add new student
app.post('/api/students', (req, res) =>
{	
	const { error } = validateStudent(req.body);		
	console.log(error);
	
	if (error)	return res.status(400).send(error.details[0].message);
	
	
	const student = 
	{
		id: students.length + 1,
		name: req.body.name,
		code: req.body.code,
	};
	
	students.push(student);
	res.send(student);
});

app.post('/web/students/create', (req, res) =>
{	
	const { error } = validateStudent(req.body);		
	console.log(error);
	
	if (error)	return res.status(400).send(error.details[0].message);
	
	
	const student = 
	{
		id: students.length + 1,
		name: req.body.name,
		code: req.body.code,
	};
	
	students.push(student);
	res.send(student);
});

// put method to update a specific student
app.put('/api/students/:id', (req, res) =>
{	
	//look up the student , if not existing return 404	
	const student = students.find(c => c.id === parseInt(req.params.id));
	if (!student)	 return res.status(404).send('not found');
	
	//Validate
	//const result = validatesSudent(req.body);	
	const { error } = validateStudent(req.body);	
	if (error)	return res.status(400).send(error.details[0].message);


	//Update student, return the updated student 
	student.name = req.body.name;
	student.code = req.body.code;
	res.send(student);		
});


app.delete('/api/students/:id', (req, res) =>
{	
	//look up the student , if not existing return 404	
	const student = students.find(c => c.id === parseInt(req.params.id));
	if (!student)	 return res.status(404).send('not found');
	
	//Delete
	const index = students.indexOf(student);
	students.splice(index, 1);
	
	res.send(student);
});






















