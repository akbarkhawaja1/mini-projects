import { deleteTasks } from "../api";
import { Link } from "react-router-dom";

const TaskList = ({tasks, setTasks}) => {

	const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
	
	const handleDelete = async (_id) => {
		try {
			await deleteTasks(_id)
			setTasks(tasks.filter((task) => task._id !== _id))
		}
		catch(error){
			console.error("Error deleting task:", error)
		}
	}

	if(tasks.length === 0) {
		return  <p className="no-items"> No Saved Tasks</p>
	}

	return (
		<ul className="task-list">
			{sortedTasks.map((task, index) => (
				<li key= {index} className="task-list-item" >
					<div className="task-header">
						<h3>{task.title}</h3>
						<p className="task-date"> Due:{new Date(task.dueDate).toLocaleDateString(undefined, {timeZone: 'UTC'})}</p>
					</div>
					<p>{task.description}</p>
					<div className="task-actions">
						<Link to={`/tasks/${task._id}`}>
							<button> Edit </button>
						</Link>
						<button onClick={() => handleDelete(task._id)}> 
							Delete
						</button>
					</div>
				</li> 
			))}
		</ul>
	)

}
export default TaskList