import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updatePassword } from "redux/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from 'react-toastify';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

const PasswordField = ({
  field,
  meta,
  label,
  handleToggleCurrentPasswordVisibility,
  showCurrentPassword,
}) => {
  return (
    <TextField
      {...field}
      fullWidth
      label={label}
      margin="normal"
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleToggleCurrentPasswordVisibility}>
              {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const ChangePasswordForm = ({onClose}) => {
  const commonState = useSelector((state) => state.common);

  const dispatch = useDispatch();
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    
    if (values.newPassword !== values.confirmNewPassword) {
      alert("New password and confirm password must match.");
    } else {
      const res = dispatch(updatePassword({user_id: commonState.user_details.user_name, new_password: values.newPassword, old_password:values.currentPassword}));
      res.then((resp) => {
        if (resp && resp.payload && resp.payload.success) {
          toast.success(resp.payload.message);
          onClose();
        }else {
           toast.error(resp.payload.message)
           onClose();
          }
      })
      resetForm();
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string().required("Required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Required"),
  });

  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState(false);

  const handleToggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item>
          <h2>Change Password</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <Box sx={{ pb: 3 }} >
                  <Box sx={{ pb: 1 }}>
                    <Field name="currentPassword">
                      {({ field, meta }) => (
                        <PasswordField
                          field={field}
                          label={"Current Password"}
                          meta={meta}
                          handleToggleCurrentPasswordVisibility={handleToggleCurrentPasswordVisibility}
                          showCurrentPassword={showCurrentPassword}
                        />
                      )}
                    </Field>
                  </Box>
                  <Box sx={{ pb: 1 }}>
                    <Field name="newPassword">
                      {({ field, meta }) => (
                        <PasswordField
                          field={field}
                          label={"New Password"}
                          meta={meta}
                          handleToggleCurrentPasswordVisibility={handleToggleNewPasswordVisibility}
                          showCurrentPassword={showNewPassword}
                        />
                      )}
                    </Field>
                  </Box>
                  <Box sx={{ pb: 1 }}>
                    <Field name="confirmNewPassword">
                      {({ field, meta }) => (
                        <PasswordField
                          field={field}
                          label={"Confirm Password"}
                          meta={meta}
                          handleToggleCurrentPasswordVisibility={handleToggleConfirmNewPasswordVisibility}
                          showCurrentPassword={showConfirmNewPassword}
                        />
                      )}
                    </Field>
                  </Box>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid || isSubmitting}
                >
                  Change Password
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChangePasswordForm;
