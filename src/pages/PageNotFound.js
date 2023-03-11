import { Box, Button,   Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
 

  function PageNotFound() {

    const navigate = useNavigate()
  
    return (
      <Box
        display={'flex'}
        height="90vh"
        alignItems={'center'}
        justifyContent="center"
        flexDirection={"column"}
      >
        <Typography variant="h1">
          404 Page Not Found
        </Typography>
        <Typography variant="h5">
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={()=>{
            navigate('/app/dashboard')
          }}
        >
          Go back to homepage
        </Button>
      </Box>
    );
  }

  
  export default PageNotFound