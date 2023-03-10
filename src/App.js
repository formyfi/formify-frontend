import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginPage from "./pages/Auth/LoginPage";
import { Dashboard } from "pages/Dashboard/Dashboard.pages";
import Layout from "components/Layout";
import FormPage from "pages/Form/Form.page";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="app/" element={<Layout />} >
                  <Route path="dashboard" element={<Dashboard />}  ></Route>
                  <Route path="forms" element={<FormPage />}  ></Route>
                  <Route path="dashboard" element={<Dashboard />}  ></Route>
                  <Route path="dashboard" element={<Dashboard />}  ></Route>
                </Route>
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    </div>
  );
}

export default App;
