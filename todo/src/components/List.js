import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTasks, addTask, completeTask } from '../ducks/reducer';

class List extends Component {
    constructor() {
        super();
        this.state = {
            newTask: ''
        }
    }

    changeTitle(newTask) {
        this.setState({ newTask })
    }

    componentDidMount() {
        this.props.getTasks()
    }

    addNewTask() {
        this.props.addTask(this.state.newTask)
        this.changeTitle('');
    }

    render() {
        let taskArr = this.props.tasks.map(task => (
            <div>
                {task.title}
                <button
                    onClick={_ => this.props.completeTask(task.id)}
                    disabled={task.completed}>
                    complete
                </button>
                <Link to={`details/${task.id}`}>Details</Link>
            </div>
        ))
        return (
            <div>
                <div>
                    <input
                        value={this.state.newTask}
                        onChange={e => this.changeTitle(e.target.value)}>
                    </input>

                    <button onClick={_ => this.addNewTask()}>add</button>
                </div>
                <div>{taskArr}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, { getTasks, addTask, completeTask })(List)