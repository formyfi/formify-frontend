import axios from "axios"

const request =  axios.create({
    baseURL: "localhost:8000"
});

const apis = {
    login : (values)=>{
       return axios.post('http://127.0.0.1:8000/api/auth/login',values, {
        headers: {
            'Accept': 'application/json',
        }
       })
    }
}


export default apis