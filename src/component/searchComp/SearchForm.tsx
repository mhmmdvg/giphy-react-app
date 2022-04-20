import { Button, TextField } from '@mui/material';
import React from 'react';

interface SearchFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchForm(props: SearchFormProps) {
  const { onChange, onSubmit } = props;

  return (
    <form data-testid="submit" onSubmit={onSubmit}>
      <TextField
        inputProps={{ 'data-testid': 'content-input' }}
        sx={{ mx: '0.4rem' }}
        id="outlined-size-small"
        label="Search GIF"
        type="search"
        size="small"
        onChange={onChange}
      />

      <Button type="submit" variant="outlined">
        Search
      </Button>
    </form>
  );
}
