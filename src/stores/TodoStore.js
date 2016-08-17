import {
    EventEmitter
}
from 'events';

import dispatcher from '../dispatcher';


import * as backend from '../backend';
var todoCollection = backend.useCollection('Todo');

class TodoStore extends EventEmitter {
    constructor() {
        super();
        this.items = [];

        todoCollection('getAll', {}).then(res => {
            if (res.data.ok) {
                this.items = res.data.result;
                this.emit('change');
            }
        });

    }
    create(text) {

        todoCollection('save', {
            description: text,
            done: false
        }).then(res => {
            if (res.data.ok) {
                this.items.push(res.data.result);
                this.emit('change');
            }
        })
    }

    delete(_id) {
        todoCollection('remove', {
            _id: _id
        }).then(res => {
            if (res.data.ok) {
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i]._id === _id) {
                        this.items.splice(i,1);
                        this.emit('change');
                    }
                }
            }
        })
    }
    
    editLocal(data){
        if (data._id) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i]._id === data._id) {
                    for (var x in this.items[i]) {
                        if (data[x] != undefined) {
                            if (x === '_id') continue;
                            this.items[i][x] = data[x];
                            //console.log('store todo item prop',x,'change with',data[x]);
                            this.emit('change');
                        }
                    }
                }
            }
        }
    }
    
    fetchAll(){
         todoCollection('getAll',{}).then(res=>{
           if(res.data.ok) {
               this.items = res.data.result;
               this.emit('change');
           }
        });
    }
    
    fetchSingle(_id){
        todoCollection('get',{_id}).then(res=>{
           if(res.data.ok) this.editLocal(res.data.result);
        });
    }

    edit(data) {
        console.log('todo store edit',data);
        this.editLocal(data);
        
        data.__match = {
            _id:data._id
        }
        todoCollection('save',data).then(res=>{
            if(!res.data.ok) this.fetchSingle(data._id)
        })
    }
    
    getAll() {
        return this.items;
    }

    handleActions(action) {
        //console.log('todoStore handling action', action)

        switch (action.type) {
            case "CREATE_TODO":
                {
                    return this.create(action.data.text);
                }
            case "EDIT_TODO":
                {
                    return this.edit(action.data);
                }
            case "DELETE_TODO":
                {
                    return this.delete(action.data._id);
                }
            case "FETCH_TODOS":{
                return this.fetchAll()
            }
            default:
                console.log('INVALID ACTION', action.type);
        }

    }
}
const singleton = new TodoStore();
window.todoStore = singleton;
dispatcher.register(singleton.handleActions.bind(singleton))
window.dispatcher = dispatcher;
export default singleton;