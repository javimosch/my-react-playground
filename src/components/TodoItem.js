import React, {
    Component
}
from 'react';
import * as actions from '../actions/TodoActions';
export default class TodoItem extends Component {
    constructor(props){
        super(props)
    }
    
    handleEdit(){
        actions.editTodo(this.props.item._id,!this.props.item.done,this.refs.txtDescription.value);
    }
    
    handleToggleDoneCheckboxClick(){
        actions.editTodo(this.props.item._id,!this.props.item.done)
    }
    
     handleDeleteButtonClick(){
        actions.deleteTodo(this.props.item._id);
    }
    
    render() {
        //console.log('todo item render',this.props.item._id,this.props.item.done);
        return (
            <div>
              <input type="text" ref='txtDescription' defaultValue={this.props.item.description} onCHange={this.handleEdit.bind(this)} />
              <label>Key: {this.props.item._id}</label>
                <div>
                    <label>Done?</label>
                    <input type="checkbox" checked={this.props.item.done} onChange={this.handleToggleDoneCheckboxClick.bind(this)} />
                    <button onClick={this.handleDeleteButtonClick.bind(this)}>X</button>
                </div>
            </div>
        );
    }
}
