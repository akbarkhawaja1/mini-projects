import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, editTasks } from "../api";

const TaskEdit = () => {
	const [task, setTask] = useState({title: '', description: '', dueDate: ''})
	const {id} = useParams()
	const navigate = useNavigate()

	useEffect(()=>{
		const fetchTask = async () => {
			try {
				const response = await getTasks()
				const taskToEdit = response.data.find(task => task._id === id)
				if(taskToEdit){
					const formattedDate = new Date(taskToEdit.dueDate).toISOString().split("T")[0]
					setTask({...taskToEdit, dueDate: formattedDate })
				}
			}
			catch(error){
				console.error('Error fetching task:', error)
			}
		}
		fetchTask()
	},[id])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try{
			await editTasks(id, task)
			setTask({title: '', description: '', dueDate: ''})
			navigate('/')
		}
		catch(error){
			console.error("Error updating task:", error)
		}
	} 

	return (
		<div>
			<form onSubmit={handleSubmit} className="form">
				<div className="form-rows">
					<input 
						type="text"
						value ={task.title}
						onChange = {(e) => setTask({...task, title: e.target.value})}
						required
						className=" form-inputs form-title"
					/>
					<input 
						type="date"
						value ={task.dueDate}
						onChange = {(e) => setTask({...task, dueDate: e.target.value})}				
						required
						className=" form-inputs"
					/>
				</div>
				<textarea 
					value ={task.description}
					onChange = {(e) => setTask({...task, description: e.target.value})}
					required
					className=" form-inputs"
				/>
				<button type="submit" className="form-button" > 
					Update Task
				</button>
			</form>
		</div>
	)

}
export default TaskEdit