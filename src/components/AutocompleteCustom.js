import { Autocomplete, TextField } from "@mui/material";
import React from "react";



const AutocompleteCustom = ({ options, value, textLabel, onChange, id, ...props })=>{

    let selectedValue = options.filter(item => item.value === value)
    
    return <div>
        <Autocomplete
            {...props}
            value={selectedValue.length > 0 ? selectedValue[0] : ''}
            onChange={(event, newValue) => {
              onChange(newValue.value);
            }}
            id={id}
            options={options}
            fullWidth
            renderInput={(params) => <TextField {...params} label={textLabel} />}
        />
    </div>
}



const AutocompleteCustomMulti = ({ options, value, textLabel, onChange, id, ...props })=>{

    return <div>
        <Autocomplete
            {...props}
            value={typeof value === "object" ? value : []}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            id={id}
            multiple={true}
            options={options}
            fullWidth
            renderInput={(params) => <TextField {...params} label={textLabel} />}
        />
    </div>
}



export {
    AutocompleteCustom, AutocompleteCustomMulti}
