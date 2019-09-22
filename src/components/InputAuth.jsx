import React, { useState, useRef, useEffect } from "react";
import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core/";

const InputAuth = ({
  styleClass,
  change,
  value,
  label,
  errorText,
  placeholder,
  type
}) => {
  const [labelWidth, setlabelWidth] = useState(0);
  const labelRef = useRef(null);
  useEffect(() => setlabelWidth(labelRef.current.offsetWidth), []);
  return (
    <FormControl variant="outlined" className={styleClass}>
      <InputLabel ref={labelRef}>{label}</InputLabel>
      <OutlinedInput
        value={value}
        labelWidth={labelWidth}
        placeholder={placeholder}
        onChange={e => change(e.target.value)}
        error={errorText ? true : false}
        type={type}
      />
    </FormControl>
  );
};

export default InputAuth;
