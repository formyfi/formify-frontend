import axios from "axios"

const request =  axios.create({
    baseURL: "localhost:8000"
});

const apis = {
    login : (values)=>{
       return axios.post('http://159.203.15.162/public/api/auth/login',values, {
        headers: {
            'Accept': 'application/json',
        }
       })
    }
}


export default apis