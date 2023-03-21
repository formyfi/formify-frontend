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
        name="radio-buttons-group"
      >
        {data.values.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
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
              <Checkbox value={option.value} defaultChecked={option.selected} />
            }
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
        // onChange={}
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

const PreviewTextField = ({ data })=>{

  return <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
}
export { PreviewRadio, PreviewCheckbox, PreviewSelect, PreviewTextField };
