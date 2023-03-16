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

}


export default apis