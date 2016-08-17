import dispatcher from '../dispatcher';

export function createTodo(text) {
    dispatcher.dispatch({
        type: 'CREATE_TODO',
        data: {
            text
        }
    });
}

export function editTodo(_id,done,description) {
    dispatcher.dispatch({
        type: 'EDIT_TODO',
        data: {
            _id,
            description,
            done
        }
    });
}


export function deleteTodo(_id) {
    dispatcher.dispatch({
        type: 'DELETE_TODO',
        data: {
            _id
        }
    });
}

export function fetchAll(){
    dispatcher.dispatch({
        type:'FETCH_TODOS'
    })
}