
import React, { ReactElement, useEffect, useState } from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { IDropdownProps } from "../../types/formTypes";


export default function DropDownSelector (props: IDropdownProps) {

    const [selectedValue, setSelectedValue] = useState(props.selectors[0]);

    const onChange = (event: any) => {
        props.onSelect(event.target.value);
        setSelectedValue(event.target.value);
    };

    return (
        <FormControl error={props.error} fullWidth>
            <InputLabel id={props.title.replaceAll(" ", "-")}>{props.title}</InputLabel>
            <Select 
                labelId="select-dropdown"
                id={`selct-${props.title.replaceAll(" ", "-")}`}
                value={selectedValue}
                label={props.title}
                onChange={onChange}
                fullWidth
            >
                {props.selectors.map(option => <MenuItem value={option}>{option}</MenuItem>)}
            </Select>
            <FormHelperText>{props.errorString}</FormHelperText>
        </FormControl>
    )

}