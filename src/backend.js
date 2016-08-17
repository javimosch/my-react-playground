import axios from 'axios';

//var URL = 'backstuff-getacoursier.herokuapp.com';
var URL = 'https://maerp-javoche.c9users.io:8081';

export function useCollection(name){
    return function(action,data){
        return axios.post(URL+'/ctrl/'+name+'/'+action,data);
    }
}