import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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

const ChangePasswordForm = () => {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Perform password change logic here
    // You can access the values object to implement your password change functionality
    // Remember to handle validation, error handling, and security measures as needed
    if (values.newPassword !== values.confirmNewPassword) {
      alert("New password and confirm password must match.");
    } else {
      // Perform password change logic
      alert("Password change successful!");
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
