import React, {
    Component
}
from 'react';

import TodoItem from '../../components/TodoItem';
import TodoStore from '../../stores/TodoStore';
import * as actions from '../../actions/TodoActions';



export default class TodoCRUD extends Component {
    constructor() {
        super();
        this.updateTodos()
    }



    componentWillMount() {
        TodoStore.on('change',this.updateTodos);
    }
    componentWillUnmount(){
        TodoStore.removeListener('change',this.updateTodos);
    }

    updateTodos() {
        console.log('todo list updating event')
        this.setState({
            items: TodoStore.getAll()
        })
    }

    handleAddInputEnter(e) {
        if (e.which == 13 && e.target.value != '') {
            console.log(e.target.value, e.which, actions);
            actions.createTodo(e.target.value);
        }
    }

    handleAddButtonClick() {
        var val = this.refs.txtAdd.value
        console.log('handleAddButtonClick', val);
        if (val != '') actions.createTodo(val);
    }

    handleFetchAllButtonClick() {
        actions.fetchAll();
    }



    render() {


        console.log('this.state.items', this.state.items);

        const items = this.state.items.map((item, i) => {
            return (
                <li key={i}><TodoItem item={item} /></li>
            )
        })
        return (
            <div>
              <h1>Tasks</h1>
              <div class="row"> 
                <input ref="txtAdd" onKeyPress={this.handleAddInputEnter.bind(this)} />
                <button onClick={this.handleAddButtonClick.bind(this)}>Add</button>
                <button onClick={this.handleFetchAllButtonClick.bind(this)}>Fetch All</button>
             </div>
              <div class="row"> 
                <ul>
                    {items}
                </ul>
             </div>
      </div>
        )
    }
}
