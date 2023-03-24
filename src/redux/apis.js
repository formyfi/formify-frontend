import axios from "axios"

const request =  axios.create({
    baseURL: process.env.REACT_APP_API_BASE?process.env.REACT_APP_API_BASE:"http://127.0.0.1:8000"
});
const token = localStorage.getItem('app_token');
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
             'Authorization': `Bearer ${token}`
         },
         params: values,
        })
     },
    
     upsertStation : (values)=>{
        return request.post('/api/stations/upsert_station',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         }
        })
     },

     deleteStation : (values)=>{
        return request.post('/api/stations/delete_station',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         }
        })
     },

     //Users APIs
     getUsers : (values)=>{
        return request.get('/api/users/get_users', {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         },
         params: values,
        })
     },
    
     updateUser : (values)=>{
        return request.post('/api/users/update_user',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         }
        })
     },
     createUser : (values)=>{
        return request.post('/api/users/create_user',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         }
        })
     },
     deleteUser : (values)=>{
        return request.post('/api/users/delete_user',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         }
        })
     },

     //Parts
    partList : (values)=>{
        return request.get('/api/parts/get_part_list', {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         },
         params: values,
        })
     },
    
     upsertPart : (values)=>{
        return request.post('/api/parts/upsert_part',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         }
        })
     },

     deletePart : (values)=>{
        return request.post('/api/parts/delete_part',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         }
        })
     },
    //  forms
     getCheckLists : (values)=>{
        return request.get('/api/checklist/get_checklists', {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         },
         params: values,
        })
     },
    
     upsertCheckLists : (values)=>{
        return request.post('/api/checklist/upsert_checklist',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         }
        })
     },

     deleteCheckLists : (values)=>{
        return request.post('/api/checklist/delete_checklist',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${token}`
         }
        })
     },
}


export default apis