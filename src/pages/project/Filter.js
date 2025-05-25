'use client'; // For Next.js App Router if using

import React from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';

const cities = [
  { label: 'All Cities' },
  { label: 'Chicago', state: 'Illinois' },
  { label: 'Los Angeles', state: 'California' },
  { label: 'Miami', state: 'Florida' },
  { label: 'New York', state: 'New York' },
];

export default function Filter() {
  return (
    <Autocomplete
      options={cities}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ display: 'flex' }} className="displayStart" style={{padding:"10px"}}>
          <Typography variant="body1">{option.label}</Typography>
          {option.state && (
            <Typography variant="caption" sx={{ color: 'gray', marginLeft: 1 }}>
              {option.state}
            </Typography>
          )}
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search cities" />
      )}
      sx={{ width: 250 }}
    />
  );
}
