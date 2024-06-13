import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_API_BASE
    ? process.env.REACT_APP_API_BASE
    : "http://127.0.0.1:8000",
});

request.interceptors.response.use(
  (res) => {
    return res;
  },
  (res) => {
    let response = res.response;
    if (response.config.url !== "/api/auth/login" && response.status === 401) {
      // refresh page
      localStorage.clear();
      window.location.reload();
    }
    return response;
  }
);

const getToken = () => {
  const token = localStorage.getItem("app_token");

  return token;
};

const super_user_ind = localStorage.getItem("super_user_ind");
const user_id = localStorage.getItem("user_id");


const apis = {
  socialLogin: (values)=>{
    return request.post("/api/auth/social_login", values, {
      headers: {
        Accept: "application/json",
      },
    });
  },
  login: (values) => {
    return request.post("/api/auth/login", values, {
      headers: {
        Accept: "application/json",
      },
    });
  },
  logout: () => {
    return request.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
  },

  //Stations
  stationList: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/stations/get_station_list", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },

  upsertStation: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/stations/upsert_station", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  deleteStation: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/stations/delete_station", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  //Users APIs
  getUsers: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/users/get_users", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },

  updateUser: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/users/update_user", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  updatePassword: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/users/update_password", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  createUser: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/users/create_user", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  deleteUser: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/users/delete_user", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  //Parts
  partList: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/parts/get_part_list", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },

  getPartsByStation: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/parts/get_parts_by_station", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },

  getPartVnumbers: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/parts/get_part_vnumbers", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },

  upsertPart: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/parts/upsert_part", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  deletePart: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/parts/delete_part", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  //  forms
  getCheckLists: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/checklist/get_checklists", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },

  getTemplates: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/checklist/get_templates", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },

  getTaskLists: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/tasks/get_tasklists", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },

  getFullInseoctionsData: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/tasks/get_full_tasklist_data", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },

  getStationInseoctionsData: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/tasks/get_station_tasklist_data", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },
  getTotalStationsInspections: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/tasks/get_total_stations_inspections", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },
  getTaskForm: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/tasks/get_task_form", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },

  upsertCheckLists: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/checklist/upsert_checklist", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  upsertCheckListForm: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/checklist/upsert_checklist_form", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  updateTaskForm: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/tasks/update_task_form", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  updateCheckListFormAsTemplate: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post(
      "/api/checklist/upsert_checklist_form_template",
      v,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
  },

  deleteCheckLists: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/checklist/delete_checklist", v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  getAllTimelines: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.get("/api/timelines/get_vnum_timline", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      params: v,
    });
  },
  setFormTimeLine: (values) => {
    let v = {super_user_ind: super_user_ind, user_id: user_id, ...values}
    return request.post("/api/timelines/upload",v, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default apis;
