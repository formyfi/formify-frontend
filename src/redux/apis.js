import axios from "axios"

const request =  axios.create({
    baseURL: "localhost:8000"
});

const apis = {
    login : (values)=>{
       return axios.post('https://reqres.in/api/login',values)
    }
}


export default apis