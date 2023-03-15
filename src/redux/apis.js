import axios from "axios"

const request =  axios.create({
    baseURL: "http://localhost/public"
});

const apis = {
    login : (values)=>{
       return request.post('/api/auth/login',values, {
        headers: {
            'Accept': 'application/json',
        }
       })
    }
}


export default apis