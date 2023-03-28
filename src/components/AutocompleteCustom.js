import { Autocomplete, TextField } from "@mui/material";
import React from "react";



const AutocompleteCustom = ({ options, value,onChange, id, ...props })=>{

    let selectedValue = options.filter(item => item.value === value)
    debugger
    return <div>
        <Autocomplete
            {...props}
            value={selectedValue.length > 0?selectedValue[0]:''}
            onChange={(event, newValue) => {
              onChange(newValue.value);
            }}
            id={id}
            options={options}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Station" />}
        />
    </div>
}



const AutocompleteCustomMulti = ({ options,value,placeholder,onChange, id, ...props })=>{

    let selectedValue = options.filter(item => item.value === value)
    debugger
    return <div>
        <Autocomplete
            {...props}
            value={selectedValue.length > 0?selectedValue:''}
            onChange={(event, newValue) => {
              onChange(newValue.value);
            }}
            id={id}
            multiple={true}
            options={options}
            fullWidth
            renderInput={(params) => <TextField {...params} label={placeholder} />}
        />
    </div>
}



export {
    AutocompleteCustom, AutocompleteCustomMulti}
