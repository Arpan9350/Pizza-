import axios from 'axios';
import { My_URL } from './Url';



export function getPost(){
    return axios.get(`${My_URL}posts/fetchpost`)
}

export function addPost(data){
    return axios.post(`${My_URL}posts/addpost`,data)
}

export function fetchdata(id){
    
    return axios.get(`${My_URL}posts/fetchdata`,id);
}

export function placeOrder(data){
    return axios.post(`${My_URL}posts/placeorder`,data) 
}
export function allorders(){
    return axios.get(`${My_URL}posts/allorders`) 
}

export function validation(data){
    return axios.post(`${My_URL}posts/validate`,data) 
}