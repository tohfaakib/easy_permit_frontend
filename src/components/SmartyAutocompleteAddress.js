import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import Stack from '@mui/material/Stack';

export default function SmartyAutocompleteAddress({id, label, data, value, onChange, onInputChange}) {

  const convertedData = [
      {
        label: '', value: '',
      }
  ];

  data.forEach(item => {
      const label = `${item.street_line}, ${item.city}, ${item.state}, ${item.zipcode}`;
      const value = item;

      // Check if the label is not already in list2 before adding
      if (!convertedData.some(existingItem => existingItem.label === label)) {
        convertedData.push({ label, value });
      }
  });

  const defaultProps = {
    options: convertedData,
    getOptionLabel: (option) => option.label,
  };

  const isOptionEqualToValue = () => {
    // Customize the equality test as needed. In this example, we compare option values.
    return true;
  };

  return (
    // <Stack spacing={1} sx={{ width: '100%' }}>
      <Autocomplete
        {...defaultProps}
        id={id}
        autoComplete
        clearOnEscape
        includeInputInList
        value={value}
        onChange={onChange}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="standard" />
        )}
        isOptionEqualToValue={isOptionEqualToValue}
      />
    // </Stack>
  );
}