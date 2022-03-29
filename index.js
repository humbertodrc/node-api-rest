const express = require("express");
const app = express();

// Todas nuestros archivos en los request van a ser en formato JSON
app.use(express.json());

const students = [
	{id: 1, nombre: "jorge", age: 20, enroll: true},
	{id: 2, nombre: "Maria", age: 25, enroll: false},
	{id: 3, nombre: "Antonio", age: 28, enroll: false},
];

// Methods: GET, POST, PUT, DELETE

app.get("/", (req, res) => {
	res.send("Node JS API");
});

app.get("/api/students", (req, res) => {
	res.send(students);
});

app.get("/api/students/:id", (req, res) => {
	const student = students.find((c) => c.id === parseInt(req.params.id));
	console.log(student);
	if (!student) {
		return res.status(404).send("Estudiante no encontrado");
	} else {
		res.send(student);
	}
});

app.post("/api/students", (req, res) => {
	const student = {
		id: students.length + 1,
		name: req.body.name,
		age: parseInt(req.body.age),
		enroll: req.body.age === "true",
	};

	students.push(student);
	res.send(students);
});

app.delete("/api/students/:id", (req, res) => {
	const student = students.find((stu) => stu.id === parseInt(req.params.id));
	if (!student) return res.status(404).send("Estudiante no encontrado");

	const index = students.indexOf(student);
	students.splice(index, 1);
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server running on port ${port}`));
