
import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            activeItem: {
                id: null,
                title: '',
                completed: false,
            },
            editing: false,

        }
        this.fetchTask = this.fetchTask.bind(this);
        this.handleTask = this.handleTask.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    };

    componentWillMount() {
        this.fetchTask();
    }

    fetchTask() {
        console.log('fetching...');
        fetch('http://127.0.0.1:8000/app/task-list/')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    todoList: data,
                }))
    }

    handleTask(e) {

        let name = e.target.name;
        let value = e.target.value;
        console.log('Name:', name);
        console.log('Value:', value);

        this.setState({
            activeItem: {
                ...this.state.activeItem,
                title: value
            }
        })
    }

    handleEvent(e) {

        e.preventDefault();
        console.log("ITEMS:", this.state.activeItem);

        let url = 'http://127.0.0.1:8000/app/task-create/';

        if (this.state.editing) {
            url = `http://127.0.0.1:8000/app/task-update/${this.state.activeItem.id}`;
            this.setState({
                editing: false
            })
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(this.state.activeItem)
        }).then((response) => {
            this.fetchTask();
            this.setState({
                activeItem: {
                    id: null,
                    title: '',
                    completed: false,
                }
            },
            )

        }).catch((error) => {
            console.log("ERROR:", error);
        })
    }

    startEdit(task) {
        this.setState({
            activeItem: task,
            editing: true,
        })
    }

    deleteItem(task) {

        fetch(`http://127.0.0.1:8000/app/task-delete/${task.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',

            },
        }).then((response) => {
            this.fetchTask()
        })
    }


    render() {
        var tasks = this.state.todoList;
        var self = this;
        return (
            <div className="container">

                <div id="task-container">
                    <form onSubmit={this.handleEvent} id="form-wrapper">
                        <div className="flex-wrapper">
                            <div style={{ flex: 6 }}>
                                <input className="form-control" id="title" value={this.state.activeItem.title} onChange={this.handleTask} name="title" type="text" placeholder="Add task"></input>
                            </div>

                            <div style={{ flex: 1 }}>
                                <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                            </div>
                        </div>
                    </form>
                    <div id="list-wrapper">
                        {tasks.map((task, index) => {

                            return (

                                <div key={index} className="task-wrapper flex-wrapper">

                                    <div style={{ flex: 7 }}>
                                        <span>{task.title}</span>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <button onClick={() => self.startEdit(task)} className="btn btn-sm btn-outline-info">Edit</button>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <button onClick={() => self.deleteItem(task)} className="btn btn-sm btn-outline-dark delete">-</button>
                                    </div>
                                </div>


                            )


                        })}



                    </div>
                </div>
            </div>
        )
    }

}

export default App;