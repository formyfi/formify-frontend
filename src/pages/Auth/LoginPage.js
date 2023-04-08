import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginApiAction } from "redux/slices/commonSlice";
import { redirect, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import backgroundImage from './login_back1.jpg';

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().min(6).required(),
  })
  .required();

const theme = createTheme({
  palette: {
    primary: {
      main: '#05386B',
      secondary: '#05CDB95'
    },
  },
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commonState = useSelector((state) => state.common);

  const onSubmit = (values) => {
    dispatch(loginApiAction(values));
  };

  React.useEffect(() => {
    if (commonState.isLogged === true) {
      parseInt(commonState.user_type_id) === 3
        ? navigate("/app/tasks")
        : navigate("/app/dashboard");
    }
  }, [commonState]);

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={commonState.loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* <Container component="main" > */}
      {/* <CssBaseline /> */}
      <Grid container flexDirection="row" >
        <Grid sx={{my:20}}item md={6}>
          <Container
            maxWidth="xs"
          >
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              
              <Typography component="h2" variant="h3" style={{ fontFamily: 'sans-serif' }}>
                Welcome Back
              </Typography>
              <Typography component="p" variant="p" style={{ fontFamily: 'sans-serif' }}>
                Please enter your email and password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 7 }}
              >
                {commonState.error && (
                  <Alert sx={{ mb: 2 }} severity="error">
                    <AlertTitle>{commonState.error}</AlertTitle>
                  </Alert>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                  error={errors.email}
                  helperText={errors?.email?.message}
                  autoFocus
                />
                {console.log(errors)}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  {...register("password")}
                  id="password"
                  error={errors.password}
                  helperText={errors?.password?.message}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
        <Grid item md={6} sx={{
          backgroundImage: `url('${backgroundImage}')`,
          height: "97.5vh",
          backgroundSize: "cover",
          display: { xs: 'none', md: 'block', lg: 'block'  } 
        }} >
          
        </Grid>
      </Grid>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      {/* </Container> */}
    </ThemeProvider>
  );
}
