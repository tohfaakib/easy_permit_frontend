import * as React from 'react';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';

export default function CustomButton() {
  return (
    <>
        <Button 
            type="submit" 
            variant="outlined" 
            endIcon={<Search />}
            onClick={(event) => event.preventDefault()}
        >
            Search
        </Button>
    </>

  );
}

// variant: outlined, contained