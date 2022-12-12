import { TextFieldProps } from '@mui/material';
import React from 'react';
import SelectInput from './SelectInput';

export default function MediaInput({ value, onChange, ...rest } : TextFieldProps) {
  const options = ['image', 'video', 'text'];
  const { type } = value;
  return (
    <Stack spacing={2}>
      <SelectInput value={type} options={options} onChange={} />
    </Stack>
  );
}
