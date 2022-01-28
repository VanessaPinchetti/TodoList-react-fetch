import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";

const App = () => {
	const [myTask, setMyTask] = useState([]);

	useEffect(() => {
		getTodos();
	}, []);

	const [myUrl, setMyUrl] = useState(
		"https://assets.breatheco.de/apis/fake/todos/user/VanessaPinchetti"
	);

	const getTodos = () => {
		fetch(myUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp);
				if (resp.status === 404) {
					createTodos();
				}
				return resp.json();
			})
			.then((data) => {
				setMyTask(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const createTodos = () => {
		fetch(myUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify([]),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				if (data.result) {
					getTodos();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const updateTodos = (myTask) => {
		fetch(myUrl, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(myTask),
		})
			.then((resp) => {
				console.log("updateTodos " + resp.ok);
				console.log("updateTodos " + resp.status);
				return resp.json();
			})
			.then((data) => {
				getTodos();
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteTodos = () => {
		fetch(myUrl, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				response.json();
			})
			.then((data) => {
				getTodos();
				console.log(data);
			})
			.catch((error) => console.log(error));
	};

	const todoList =
		myTask.length > 0 ? (
			myTask.map((myTask, index) => {
				return (
					<li key={index}>
						{myTask.label}
						<button onClick={() => removeTodo(index)}>
							<i className="fas fa-trash-alt"></i>
						</button>
					</li>
				);
			})
		) : (
			<li>Empty List</li>
		);

	const handlePost = (e) => {
		if (e.keyCode === 13 && e.target.value !== "") {
			let task = [...myTask].concat({
				label: e.target.value,
				done: false,
			});
			setMyTask(task);
			updateTodos(task);
			e.target.value = "";
		}
	};

	const removeTodo = (i) => {
		let newTodo = [...myTask];
		newTodo.splice(i, 1);
		updateTodos(newTodo);
	};

	const itemsLeft = () => {
		if (myTask.length === 0) {
			return "No task left to do, Add a task!";
		} else if (myTask.length === 1) {
			return "1 Task left to do";
		} else if (myTask.length > 1) {
			return `${myTask.length} Tasks to do`;
		}
	};

	return (
		<div className="container">
			<h1 className="title">Todo List</h1>
			<ul className="listItem">
				<input
					type="text"
					onKeyUp={handlePost}
					placeholder="What needs to be done"
				/>
				{todoList}
			</ul>
			<div className="footer">
				<small>{itemsLeft()}</small>
				<button
					className="btn btn-outline-primary btn-sm float-end"
					onClick={() => deleteTodos()}>
					Delete User and My Task
				</button>
			</div>
		</div>
	);
};
export default App;

// fetch: "https://assets.breatheco.de/apis/fake/todos/user/VanessaPinchetti";
