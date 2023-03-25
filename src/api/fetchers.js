import axios from "axios";

const request =  axios.create({
    baseURL: process.env.REACT_APP_API_BASE?process.env.REACT_APP_API_BASE:"http://127.0.0.1:8000"
});
const token = localStorage.getItem('app_token');

// export const fetchData = async ({mentee_id}) => {

//     const response = await fetchDataApi.get(`/copilot/get_pre_call_planning_list/`, { params: { mentee_id } });
//     return response.data
// }

export const getCheckLists = async (values)=>{
    const res = await request.get('/api/checklist/get_checklists', {
     headers: {
         'Accept': 'application/json',
         'Authorization': `Bearer ${token}`
     },
     params: values,
    })
    return res.data
 }

 export const upsertCheckLists = async (values)=>{
    const res = await request.post('/api/checklist/upsert_checklist',values, {
     headers: {
         'Accept': 'application/json',
         'Authorization': `Bearer ${token}`
     }
    })
    return res.data
 }

 export const deleteCheckLists = async (values)=>{
    const res = await request.post('/api/checklist/delete_checklist',values, {
     headers: {
         'Accept': 'application/json',
         'Authorization': `Bearer ${token}`
     }
    })
    return res.data
 }

