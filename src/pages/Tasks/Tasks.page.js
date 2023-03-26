import {
  Box,
  Button,
  Drawer,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Divider,
  Container,
} from "@mui/material";
import EnhancedTable from "components/Table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getPartsByStation, getPartVnumbers } from "redux/slices/partSlice";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SelectInfo from "./components/SelectInfo";
import FormSubmission from "./components/FormSubmission";
import FormPreview from "./components/FormReview";

const steps = ["Select Info", "Form Submission", "Validate Form"];

const TasksPage = () => {
  const dispatch = useDispatch();
  const commonState = useSelector((state) => state.common);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if((activeStep +  1 )< steps.length){
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if(activeStep > 0){
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Box>
      <Container sx={{ marginTop: 5 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {/* step 1- Select  */}
        {activeStep === 0 && (
          <SelectInfo handleNext={handleNext} handleBack={handleBack} />
        )}

        {/* step 2- form  */}
        {activeStep === 1 && <FormSubmission  handleNext={handleNext} handleBack={handleBack}  />}

        {/* step 3- submit form  */}
        {activeStep === 2 && <FormPreview  handleNext={handleNext} handleBack={handleBack}  />}
      </Container>
    </Box>
  );
};

export default TasksPage;
