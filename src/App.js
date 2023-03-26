import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { blue, purple, teal, indigo, blueGrey, deepPurple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import LoginPage from "./pages/Auth/LoginPage";
import { Dashboard } from "pages/Dashboard/Dashboard.pages";
import Layout from "components/Layout";
import FormPage from "pages/Form/Form.page";
import PageNotFound from "pages/PageNotFound";
import StationPage from "pages/Station/Station.page";
import UserPage from "pages/User/User.page";
import PartsPage from "pages/Parts/Parts.page";
import TasksPage from "pages/Tasks/Tasks.page";
import ManageForm from "pages/Form/ManageForm.page";
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      secondary: indigo[200]
    },
  },
});

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="app/" element={<Layout />} >
                  <Route path="dashboard" element={<Dashboard />}  ></Route>
                  <Route path="checklists" element={<ManageForm />}  ></Route>
                  <Route path="formBuilder/:form_id" element={<FormPage />}  ></Route>
                  <Route path="stations" element={<StationPage />}  ></Route>
                  <Route path="parts" element={<PartsPage />}  ></Route>
                  <Route path="tasks" element={<TasksPage />}  ></Route>
                  <Route path="users" element={<UserPage />}  ></Route>
                  <Route path="dashboard" element={<Dashboard />}  ></Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </div>
  );
}

export default App;
