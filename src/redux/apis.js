import axios from "axios"

const request =  axios.create({
    baseURL: "http://127.0.0.1:8000"
});
// const token = localStorage.getItem('app_token');
// axios.defaults.header.common['Authorization'] = token;
// debugger
const apis = {
    login : (values)=>{
       return request.post('/api/auth/login',values, {
        headers: {
            'Accept': 'application/json',
        }
       })
    },

    //Stations
    stationList : (values)=>{
        return request.get('/api/stations/get_station_list', {
         headers: {
             'Accept': 'application/json',
         },
         params: values,
        })
     },
    
     upsertStation : (values)=>{
        return request.post('/api/stations/upsert_station',values, {
         headers: {
             'Accept': 'application/json',
         }
        })
     },

     deleteStation : (values)=>{
        return request.post('/api/stations/delete_station',values, {
         headers: {
             'Accept': 'application/json',
         }
        })
     },

     //Users APIs

     getUsers : (values)=>{
        return request.get('/api/users/get_users', {
         headers: {
             'Accept': 'application/json',
         },
         params: values,
        })
     },
    
     updateUser : (values)=>{
        return request.post('/api/users/update_user',values, {
         headers: {
             'Accept': 'application/json',
         }
        })
     },
     createUser : (values)=>{
        return request.post('/api/users/create_user',values, {
         headers: {
             'Accept': 'application/json',
         }
        })
     },
     deleteUser : (values)=>{
        return request.post('/api/users/delete_user',values, {
         headers: {
             'Accept': 'application/json',
         }
        })
     },
}


export default apis