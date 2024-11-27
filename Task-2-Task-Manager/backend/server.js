const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://zephyrusAdmin:kGdMN9WhDPGUU2Bu@zephyruscluster.1ug59.mongodb.net/';

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
	} catch (error) {
		console.error('Error in connecting to MongoDB:', error);
		throw new Error('Error in connecting to MongoDB.');
	}
};

connectDB();

const taskSchema = new mongoose.Schema({
	title:  { type: String, required: true },
	description:  { type: String, required: true },
	dueDate:  { type: Date, required: true },
})

const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', async (req,res) => {
	try {
		const tasks = await Task.find().sort({dueDate: -1 })

		if(tasks.length === 0) {
		 return	res.send([])
		}

		res.json(tasks)
	}
	catch(error){
		res.status(500).json({error: 'Failed getting tasks'})
	}
})

app.post('/tasks', async (req, res) => {
	try {
		const {title, description, dueDate} = req.body
		
		const task = new Task({title, description, dueDate});
		await task.save()

		res.json(task)
	}
	catch(error){
		res.status(400).json({error: 'Failed creating tasks'})
	}
})

app.put('/tasks/:id', async (req, res) => {
	try {
		const {id} = req.params
		const {title, description, dueDate} = req.body
		
		const updatedTask = await Task.findByIdAndUpdate( 
			id, 
			{title, description, dueDate},
			{new: true}
		);

		if(!updatedTask){
			return res.status(404).json({error: 'Task not found'})
		}

		res.json({message: 'Task updated'})
	}
	catch(error){
		res.status(500).json({error: 'Failed to update tasks'})
	}
})

app.delete('/tasks/:id', async (req, res) => {
	try {
		const {id} = req.params
		
		const deletedTask = await Task.findByIdAndDelete(id) 

		if(!deletedTask){
			return res.status(404).json({error: 'Task not found'})
		}

		res.json({message: 'Task deleted'})
	}
	catch(error){
		res.status(400).json({error: 'Failed to delete tasks'})
	}
})

app.listen(PORT, () => {
	console.log(`Example app listening on PORT ${PORT}`)
})