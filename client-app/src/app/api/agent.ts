import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { IPizza } from '../modules/pizza';

axios.defaults.baseURL='https://localhost:44394/api';

axios.interceptors.response.use(undefined, error=>{
    if(error.response.status===404){
        throw error.response;
    }
})
const responseBody=(response:AxiosResponse)=> response.data;

const sleep=(ms:number)=>(response:AxiosResponse)=>
  new Promise<AxiosResponse>(resolve=>setTimeout(()=>resolve(response), ms))
  
const requests={
    get: (url:string)=>axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url:string, body: {})=>axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url:string, body: {})=>axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url:string)=>axios.delete(url).then(sleep(1000)).then(responseBody)
}

const PizzaAdmin={
    list:():Promise<IPizza[]>=>requests.get('/pizza'),
    details:(id:string)=>requests.get(`/pizza/${id}`),
    create:(pizza:IPizza)=>requests.post('/pizza/', pizza),
    update:(pizza:IPizza)=>requests.put(`/pizza/${pizza.id}`, pizza),
    delete:(id:string)=>requests.delete(`/pizza/${id}`),
}

export default {
    PizzaAdmin
}