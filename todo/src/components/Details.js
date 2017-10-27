import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTasks, editTask, completeTask, deleteTask } from '../ducks/reducer';

class Details extends Component {
    constructor() {
        super();

        this.state = {
            task: {},
            newTitle: '',
            newDescription: ''
        }
    }

    changeTitle(newTitle){
        this.setState({newTitle})
    }

    changeDescription(newDescription){
        this.setState({newDescription})
    }

    cancel(){
        this.setState({
            newTitle: this.state.task.title,
            newDescription: this.state.task.description
        })
    }

    edit(){
        let task = {
            title: this.state.newTitle,
            description: this.state.newDescription
        }
        this.props.editTask(this.state.task.id, task);
    }

    delete(){

        this.props.deleteTask(this.state.task.id);
        this.props.history.push('/');
    }

    complete(){
        this.props.completeTask(this.state.task.id);
        this.props.history.push('/')
    }

    componentDidMount() {
        this.props.getTasks().then(resp => {
            let tempTask = resp.value.find(task => task.id == this.props.match.params.id);
            // console.table(tempTask);
            if (tempTask) {
                this.setState({
                    task: tempTask,
                    newTitle: tempTask.title,
                    newDescription: tempTask.description
                })
            } else {
                // console.log('here')
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (
            <div>
                Title:
                <input
                    value={this.state.newTitle}
                    onChange={e=> this.changeTitle(e.target.value)}>
                </input>
                <br />
                Description:
                <textarea
                    value={this.state.newDescription}
                    onChange={e=> this.changeDescription(e.target.value)}>
                </textarea>
                <br />
                <button onClick={_=>this.delete()}>delete</button>
                <button onClick={_=>this.cancel()}>Cancel</button>
                <button onClick={_=>this.edit()}>Edit</button>
                <button 
                    disabled={this.state.task.completed}
                    onClick={_=>this.complete()}>complete</button>


            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, { getTasks, editTask, completeTask, deleteTask })(Details)