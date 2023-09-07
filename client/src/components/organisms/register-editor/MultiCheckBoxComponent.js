import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
} from "@mui/material";

function MultiCheckboxComponent(props) {
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup>
        {Object.entries(props.options).map(([id, option], index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                id={props.id}
                onChange={props.onChange}
                name={option.value}
                checked={props.value[option.value]}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default MultiCheckboxComponent;