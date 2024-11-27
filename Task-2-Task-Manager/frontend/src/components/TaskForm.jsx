import { useState } from "react";
import { postTasks } from "../api";


const TaskForm = ({setTasks}) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [dueDate, setDueDate] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		const localDate = new Date(dueDate)

		const task = {
			title, 
			description,
			 dueDate: localDate.toISOString()
		}

		try{
			const response = await postTasks(task)
			setTasks((prevTasks) => [ response.data, ...prevTasks])
			setTitle('')
			setDescription('')
			setDueDate('')
		}
		catch(error){
			console.error("Error posting task:", error)
		}
	} 

	return (
		<form onSubmit={handleSubmit} className="form">
			<div className="form-rows" >
				<input 
					type="text"
					placeholder= "Task Title"
					value ={title}
					onChange = {(e) => setTitle(e.target.value)}
					required
					className=" form-inputs form-title"
				/>
				<input 
					type="date"
					placeholder= "Due Date"
					value ={dueDate}
					onChange = {(e) => setDueDate(e.target.value)}
					required
					className="form-inputs"

				/>
			</div>
			<textarea 
				placeholder= "Description"
				value ={description}
				onChange = {(e) => setDescription(e.target.value)}
				required
				className="form-inputs"

			/>
			<button type="submit" className="form-button">
				Add Task
			</button>
		</form>
	)
}

export default TaskForm