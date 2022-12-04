import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { MuiInputProps } from './InputType';

function SelectInput({
  onChange, value, name, options, label, error, helperText,
}:MuiInputProps) {
  const onChangeSelect = (event: React.SyntheticEvent, val: any) => {
    const ev = { target: { name, value: val } } as React.ChangeEvent<HTMLInputElement>;
    if (onChange) onChange(ev);
  };
  const getOptionLabel = (option: {
    name: any;
    label: any;
    title: any;
  }) => option.name ?? option.label ?? option.title ?? option;

  const isOptionEqualToValue = (o: any, v: any) => {
    if (o !== undefined && v !== undefined) {
      // eslint-disable-next-line max-len, no-nested-ternary
      return (o.id ? o.id === v.id : o.name ? o.name === v.name : o.label ? o.label === v.label : o.title ? o.title === v.title : o === v);
    }
    return false;
  };
  return (
    <Autocomplete
      value={value ?? options[0] ?? ''}
      options={options}
      filterSelectedOptions
      getOptionLabel={getOptionLabel}
      onChange={onChangeSelect}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) => (
        <TextField {...params} label={label} error={error} helperText={helperText} />
      )}
    />
  );
}

export default SelectInput;
