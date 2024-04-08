import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IFormConfigs } from '../../types/formTypes';
import DropDownSelector from '../common/dropdownSelector';


export default function DynamicForm(props: IFormConfigs) {
  return (
    <Box
      component="form"
      sx={{
          display: 'block',
          p: 1,
          m: 1,
      }}
      autoComplete="off"
    >
      {props.inputConfig.map(config => {
        if(config.type === "DROPDOWN") {
          return (
            <Box       
              sx={{
                display: 'block',
                p: 1,
            }}>
              <DropDownSelector
                title={config.label}
                selectors={config.possibleValues ? config.possibleValues : []}
                onSelect={config.onChange}
                error={config.error}
                errorString={config.error ? config.errorString : ''}
              />
            </Box>
          )
        } else {
          return (
            <Box       
              sx={{
                display: 'block',
                p: 1,
                m: 1,
            }}>
              <TextField
                id={config.label}
                label={config.label}
                fullWidth
                required={config.required}
                onChange={(e) => config.onChange(e)}
                error={config.error}
                helperText={config.error ? config.errorString : ''}
              />
            </Box>
          )
        }
      })}
      
    </Box>
  );
}