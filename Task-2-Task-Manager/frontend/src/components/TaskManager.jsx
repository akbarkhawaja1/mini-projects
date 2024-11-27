import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { getTasks } from "../api";

const TaskManager = () => {
	const [tasks, setTasks] = useState([])
	
	useEffect(() =>{
		const fetchTasks = async () => {
			try{
				const response = await getTasks()
				
				if(Array.isArray(response.data)) {
					setTasks(response.data)
				}
			}
			catch(error) {
				console.error("Error fetching tasks:", error )
			}
		}
		fetchTasks()
	},[])

	return (
		<div className="form-container">
			<TaskForm setTasks={setTasks}/>
			<TaskList tasks={tasks} setTasks={setTasks}/>
		</div>
	)
	
}

export default TaskManager