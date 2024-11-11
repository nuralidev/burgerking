import axios, { Axios } from "axios";
async function fetchOrder() {
const reply=await  axios.post('http://localhost:3000/orders')
    console.log(reply.data)
}
async function fetchOrder() {
    const reply=await  axios.post('http://localhost:3000/orders')
        console.log(reply.data)
    }
fetchOrder()