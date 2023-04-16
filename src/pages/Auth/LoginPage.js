import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Button, IconButton, InputAdornment } from "@mui/material";
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
import { loginApiAction, socialLoginApiAction } from "redux/slices/commonSlice";
import { redirect, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import backgroundImage from './login_back1.jpg';
import LOGO from './../../components/LOGO.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { supabase } from "components/Layout";


const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().min(6).required(),
  })
  .required();

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
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (values) => {
    dispatch(loginApiAction(values));
  };
  
  React.useEffect(()=>{
    supabase.auth.getUser().then((response)=>{
        if(response.data && response.data.user && response.error === null){
          dispatch(socialLoginApiAction({
            user_name: response.data.user.email,
            client_id: response.data.user.id
          }));
        }
    })
  },[])

  React.useEffect(() => {
    if (commonState.isLogged === true) {
      navigate("/app/dashboard")
    }
  }, [commonState]);

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={commonState.loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* <Container component="main" > */}
      {/* <CssBaseline /> */}
      <Grid container flexDirection="row" >
        <Grid item xs={12} md={4}>
          <Container
            maxWidth="xs"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
             alignItems: "center",
              minHeight: "100vh"
            }}  
          >
            <Box sx={{ width: "100%" }} >
            <img src={LOGO} style={{ height: "auto", width: "150px" }} alt="logo"  />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
               
              <Typography component="h3" variant="h4" color={'primary'} style={{ fontFamily: 'sans-serif' }}>
                Sign in
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
                  {...register("password")}
                  id="password"
                  error={errors.password}
                  type={showPassword ? "text" : "password"}
                  helperText={errors?.password?.message}
                  autoComplete="current-password"
                  InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={()=>{
                            setShowPassword(!showPassword)
                          }}
                          onMouseDown={()=>{
                            setShowPassword(!showPassword)
                          }}
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <center>
                <Button
                  
                  
                  onClick={()=>{
                    
                    supabase.auth.getUser().then((response)=>{
                      if(response.data && response.data.user && response.error === null){
                        dispatch(socialLoginApiAction({
                          user_name: response.data.user.email,
                          client_id: response.data.user.id
                        }));
                      } else {
                        supabase.auth.signInWithOAuth({
                          provider: 'azure',  
                          options: {
                            scopes: 'email',
                          },
                        })
                      }
                  })

                   
                  }}
                >
                  Login with SSO 
                </Button>
                </center>
              </Box>

            </Box>
            <Box sx={{ mt: 8 , display: 'flex', justifyContent:'center',flexDirection:'column' }}>
            
              <Button 
                 >
                Terms & Conditions
              </Button>{" "}
              {" "}
              <Button>
                Privacy Policy
              </Button>
            
          </Box>
          </Container>
        </Grid>
        <Grid item xs={12} md={8} sx={{
          backgroundImage: `url('${backgroundImage}')`,
          height: "97.5vh",
          backgroundSize: "cover",
          display: { xs: "none", md: "block", lg: "block" }, 
        }} >
          
        </Grid>
      </Grid>
       
    </Box>
  );
}
