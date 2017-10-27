import axios from 'axios'

// Actions
const GET_TASKS = 'GET_TASKS';
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK = 'EDIT_TASK';
const DELETE_TASK = 'DELETE_TASK';


// initial state
const initialState = {
    tasks: []
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS + '_FULFILLED':
        case ADD_TASK + '_FULFILLED':
        case EDIT_TASK + '_FULFILLED':
        case DELETE_TASK + '_FULFILLED':
            return {tasks: action.payload};
        default:
            return state;
    }
};

// Action Creators
//get task
export function getTasks() {
    return {
        type: GET_TASKS,
        payload: axios.get('https://practiceapi.devmountain.com/api/tasks').then(resp => resp.data)
    }
};

// add task
export function addTask(title) {
    let body = {title};
    return {
        type: GET_TASKS,
        payload: axios.post('https://practiceapi.devmountain.com/api/tasks', body).then(resp => resp.data)
    }
};

// edit task
export function editTask(id, task) {
    return {
        type: GET_TASKS,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, task).then(resp => resp.data)
    }
};

//delete task
export function deleteTask(id) {
    return {
        type: GET_TASKS,
        payload: axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(resp => resp.data)
    }
};

// complet task
export function completeTask(id) {
    return {
        type: GET_TASKS,
        payload: axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(resp => resp.data)
    }
};



