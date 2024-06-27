import React, { useState } from "react";
import { getTaskForm, updateTaskForm, unlockForm } from "redux/slices/formSlice";
import { useDispatch, useSelector } from "react-redux";
import FormPreviewWithSubmit from "components/FormBuilder/SubmitForm/FormPreviewWithSubmit";
import { toast } from "react-toastify";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import Tooltip from '@mui/material/Tooltip';

const { Box, Typography, Paper, Divider, Skeleton } = require("@mui/material");

const FormSubmission = ({
  handleNext,
  handleBack,
  stationValue,
  partValue,
  vnumberValue,
  form_json,
  form_value,
  form_id,
  view,
  setFetchVnumbers,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(form_json ? form_json : []);
  const [formValue, setFormValue] = useState(form_value ? form_value : []);
  const [formName, setFormName] = useState("");
  const [formID, setFormId] = useState(form_id ? form_id : "");
  const[formLockedByUserId, setFormLockedByUserId] = useState(null);
  const[formLockedByUserName, setFormLockedByUserName] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const commonState = useSelector((state) => state.common);
  React.useEffect(() => {
    if (!formData.length || !formValue.length) {
      setLoading(true);
      const res = dispatch(
        getTaskForm({
          station_value: stationValue,
          part_value: partValue,
          v_number: vnumberValue,
          user_id: commonState.user_id,
          org_id: commonState.org_id,
        })
      );
      res.then((resp) => {
        if (
          resp &&
          resp.payload.form_data &&
          resp.payload.form_data.form_json
        ) {
          setFormData(JSON.parse(resp.payload.form_data.form_json));
          setFormName(resp.payload.form_data.form_name);
          setFormId(resp.payload.form_data.form_id);
          setFormLockedByUserId(resp.payload.locked_by_user_id);
          setFormLockedByUserName(resp.payload.locked_by_user_name);
          if (
            resp &&
            resp.payload.form_data &&
            resp.payload.form_data.form_value
          ) {
            setFormValue(JSON.parse(resp.payload.form_data.form_value));
          }
        } else
          toast.info(
            "Form has not been published for this part - station. Please contact your manager"
          );

        setLoading(false);
      });
    }
  }, []);
  const submit = (formResponses) => {
    let is_completed = formResponses.is_completed
    delete formResponses.is_completed
    const res = dispatch(
      updateTaskForm({
        form_json: JSON.stringify(formResponses),
        form_id: formID,
        is_completed: is_completed,
        org_id: commonState.org_id,
        part_id: partValue,
        station_id: stationValue,
        part_vnum: vnumberValue,
        user_id: commonState.user_id,
      })
    );
    res.then((resp) => {
      if (resp && resp.payload && resp.payload.success) {
        if(!is_completed) toast.success("Progress has been saved.");
        else{
          toast.success("Inspection submitted successfully.");
          if(setFetchVnumbers) setFetchVnumbers(true);
          goingBack()
        } 
      } else{
        toast.error("Somthing went wrong.");
        if(is_completed){
          if(setFetchVnumbers) setFetchVnumbers(true);
          goingBack()
        }
      } 
      
    });
  };
  const goingBack = () => {
    dispatch(unlockForm());
    handleBack();
  }

  return (
    <Box sx={{ mt: 5 }} component="form">
      <Paper
        elevation={3}
        sx={{
          p: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: 650,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {loading ? (
          <Box sx={{ mx: 20, width: 250 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                maxWidth: 650,
                mb: 2,
              }}
            >
              <Typography component="h2" variant="h6" color="primary">
                Part vnumber:&nbsp;
                <Typography color="black" sx={{ display: "inline-block" }}>
                  {vnumberValue}
                </Typography>
              </Typography>
              {formLockedByUserId ? (
                  <Tooltip title={`Form is locked by ${formLockedByUserName}`}>
                    <LockPersonIcon sx={{ color: 'red' }}/>
                  </Tooltip>
                ) : (
                  <Tooltip title="Form is open">
                    <LockOpenTwoToneIcon sx={{ color: 'green' }}/>
                  </Tooltip>
                )}
              <Typography component="h2" variant="h6" color="primary">
                Form name:&nbsp;
                <Typography color="black" sx={{ display: "inline-block" }}>
                  {formName}
                </Typography>
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ mx: 5 }}>
              <FormPreviewWithSubmit
                filledFormValue={formValue}
                onSubmit={(formResponses) => {
                  submit(formResponses);
                }}
                view={view}
                isSubmitable
                onCancel={() => {
                  goingBack();
                  setFetchVnumbers(true);
                }}
                title=""
                previewData={formData}
                formLockedByUserId={formLockedByUserId}
                sx={{ maxHeight: "inherit" }}
                vnumberValue={vnumberValue}
                stationValue={stationValue}
              />
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default FormSubmission;
