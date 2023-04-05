import {
  Box,
  Container,
} from "@mui/material";
import React from "react";

import "react-toastify/dist/ReactToastify.css";


import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SelectInfo from "./components/SelectInfo";
import FormSubmission from "./components/FormSubmission";
import FormPreview from "./components/FormReview";

const steps = ["Select Info", "Fill out checklist"];

const TasksPage = () => {

  const [stationValue, setStationValue] = React.useState(9);
  const [partValue, setPartValue] = React.useState(2);
  const [vnumberValue, setVnumberValue] = React.useState(5698);
  const [activeStep, setActiveStep] = React.useState(0);
  const [partList, setPartList] = React.useState([]);
  const [partVnum, setPartVnum] = React.useState([]);

  const handleChange = (name, value) => {
    if(name === 'station') setStationValue(value);
    else if(name === 'part') setPartValue(value);
    else setVnumberValue(value);
  }


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
        {activeStep === 1 && (
          <SelectInfo stationValue={stationValue}  partValue={partValue}  vnumberValue={vnumberValue} partList={partList} partVnum={partVnum} setPartList={setPartList} setPartVnum={setPartVnum} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />
        )}

        {/* step 2- form  */}
        {activeStep === 0 && <FormSubmission stationValue={stationValue} partValue={partValue} vnumberValue={vnumberValue} handleNext={handleNext} handleBack={handleBack}  />}

        {/* step 3- submit form  */}
        {activeStep === 2 && <FormPreview  handleNext={handleNext} handleBack={handleBack}  />}
      </Container>
    </Box>
  );
};

export default TasksPage;
