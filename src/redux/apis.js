import axios from "axios"

const request =  axios.create({
    baseURL: process.env.REACT_APP_API_BASE?process.env.REACT_APP_API_BASE:"http://127.0.0.1:8000"
});


request.interceptors.response.use((res)=>{
    return res
},(res)=>{
    debugger
    let response = res.response;
    if(response.status === 401){
        // refresh page 
        window.location.reload()
    }
    return response
})

const getToken = ()=>{
    const token = localStorage.getItem('app_token');
    
    return token
}


const apis = {
    login : (values)=>{
       return request.post('/api/auth/login',values, {
        headers: {
            'Accept': 'application/json',
        }
       })
    },

    logout : ()=>{
        return request.post('/api/auth/logout', {},{
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },

    //Stations
    stationList : (values)=>{
        return request.get('/api/stations/get_station_list', {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         },
         params: values,
        })
     },
    
     upsertStation : (values)=>{
        return request.post('/api/stations/upsert_station',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },

     deleteStation : (values)=>{
        return request.post('/api/stations/delete_station',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },

     //Users APIs
     getUsers : (values)=>{
        return request.get('/api/users/get_users', {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         },
         params: values,
        })
     },
    
     updateUser : (values)=>{
        return request.post('/api/users/update_user',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },
     createUser : (values)=>{
        return request.post('/api/users/create_user',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },
     deleteUser : (values)=>{
        return request.post('/api/users/delete_user',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },

     //Parts
    partList : (values)=>{
        return request.get('/api/parts/get_part_list', {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         },
         params: values,
        })
     },

     getPartsByStation : (values)=>{
        return request.get('/api/parts/get_parts_by_station', {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         },
         params: values,
        })
     },

     getPartVnumbers : (values)=>{
        return request.get('/api/parts/get_part_vnumbers', {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         },
         params: values,
        })
     },
    
     upsertPart : (values)=>{
        return request.post('/api/parts/upsert_part',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },

     deletePart : (values)=>{
        return request.post('/api/parts/delete_part',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },
    //  forms
     getCheckLists : (values)=>{
        return request.get('/api/checklist/get_checklists', {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         },
         params: values,
        })
     },
     
     getTaskForm : (values)=>{
        return request.get('/api/tasks/get_task_form', {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         },
         params: values,
        })
     }, 

     upsertCheckLists : (values)=>{
        return request.post('/api/checklist/upsert_checklist',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },

     upsertCheckListForm : (values)=>{
        return request.post('/api/checklist/upsert_checklist_form',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },

     deleteCheckLists : (values)=>{
        return request.post('/api/checklist/delete_checklist',values, {
         headers: {
             'Accept': 'application/json',
             'Authorization': `Bearer ${getToken()}`
         }
        })
     },
}


export default apis