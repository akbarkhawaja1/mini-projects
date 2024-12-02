# Task 2: Dynamic Task Management Application

## Objective 
Develop an interactive task managment system :

### Front-End

- Create a form for Task Title, Description, and Due Date.
- Display tasks in a list, with options to edit or delete each task.
- Implement client-side validation

### Back-End

- Set up a simple RESTful API using Node.js/Express.
- Implement endpoints for CRUD operations
	- `GET /tasks`: Retrieve all tasks.
	- `POST /tasks`: Add a new task.
	- `PUT /tasks/:id`: Update a task.
	- `DELETE /tasks:id`: Delete a task.
- Implement local storage or database integration 

## How It Was Made 

- **JavaScript** was used to make asynchronous request to the public API.
- Data is fetched using **Axios**
- Error handling was implimented using `try/catch` blocks.
- The data is displayed using **React components**. 
- **Search/filter functionality** added to create a more interactive app. 

## How To Run

1. **Install Back-End dependencies and start server**
	- Navigate to the back-end directory and install the dependencies: 
    ```bash
    npm install
    ```
	- Start the server:
	```bash
    npm start
    ```
2. **Install Front-End dependencies and start server**  
	- Open a new terminal and navigate to the front-end directory:
	`cd path-to-front-end-directory`
	- Install front-end dependencies:  
    ```bash
    npm install
    ```
	- Start the front-end server:
	```bash
    npm start
    ```

## Technologies Used
- React/HTML
- CSS
- JavaScript
- Axios 
- Node.js
- Express
- MongoDB