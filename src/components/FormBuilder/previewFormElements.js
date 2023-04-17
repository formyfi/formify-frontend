import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Autocomplete,
  Box,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

const PreviewRadio = ({ data }) => {
  const selected = data.values.filter((itm) => itm.selected === true);
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{data.label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={selected.length > 0 ? selected[0].value : ""}
        name={data.name}
        row
      >
        {data.values.map((option) => (
          <FormControlLabel
            value={option.value}
            control={
              <Radio
                color={
                  option.value === "pass"
                    ? "success"
                    : option.value === "fail"
                    ? "error"
                    : "primary"
                }
                name={option.name}
                value={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const PreviewCheckbox = ({ data }) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{data.label}</FormLabel>
      <FormGroup>
        {data.values.map((option) => (
          <FormControlLabel
            control={
              <Checkbox
                name={option.name}
                value={option.value}
                defaultChecked={option.selected}
              />
            }
            name={data.name}
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

const PreviewSelect = ({ data }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{data.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth
        label={data.label}
        name={data.name}
      >
        {data.values.map((option) => (
          <MenuItem value={option.value} selected={option.selected}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const PreviewTextField = ({ data }) => {
  return (
    <FormControl fullWidth>
      <TextField
        id={data.label}
        label={data.label}
        variant="outlined"
        fullWidth
        name={data.name}
      />
      <FormHelperText>{data?.description}</FormHelperText>
    </FormControl>
  );
};

const PreviewTextAreaField = ({ data }) => {
  return (
    <FormControl fullWidth>
      <TextField
        id={data.label}
        label={data.label}
        variant="outlined"
        multiline
        fullWidth
        name={data.name}
        minRows={3}
      />
      <FormHelperText>{data?.description}</FormHelperText>
    </FormControl>
  );
};

const PreviewNumberField = ({ data }) => {
  return (
    <FormControl>
      <TextField
        type={"number"}
        id={data.label}
        label={data.label}
        name={data.name}
        variant="outlined"
        fullWidth
      />
      <FormHelperText>{data?.description}</FormHelperText>
    </FormControl>
  );
};

const PreviewAutoCompleteField = ({ data }) => {
  return (
    <FormControl fullWidth>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data.values}
        freeSolo={!data.requireValidOption}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            name={data.name}
            type="text"
            label={data.label}
          />
        )}
      />
    </FormControl>
  );
};

const PreviewDateField = ({ data }) => {
  return (
    <FormControl>
      <TextField
        sx={{ height: "40px" }}
        shrink
        type={"date"}
        fullWidth
        name={data.name}
        id={data.label}
        label={data.label}
        focused
      />
      <FormHelperText>{data?.description}</FormHelperText>
    </FormControl>
  );
};

const PreviewTypography = ({ data }) => {
  return (
    <Box my={1} className="preview-typo">
      <Typography variant={data.subtype} component={data.subtype}>
        {data.label}
      </Typography>
    </Box>
  );
};

const PreviewUploadField = ({ data }) => {
  return (
    <FormControl>
      <Button variant="outlined">Upload</Button>
    </FormControl>
  );
};

const PreviewImage = ({ data }) => {
  console.log(data);
  return (
    data.value &&
    data.value?.success && (
      <FormControl>
        <img
          src={process.env.REACT_APP_API_BASE + "/" + data.value?.file_path}
          class="preview-img"
          alt="preview-details"
        />
      </FormControl>
    )
  );
};

export {
  PreviewRadio,
  PreviewCheckbox,
  PreviewSelect,
  PreviewTextField,
  PreviewTextAreaField,
  PreviewNumberField,
  PreviewAutoCompleteField,
  PreviewDateField,
  PreviewTypography,
  PreviewUploadField,
  PreviewImage,
};
