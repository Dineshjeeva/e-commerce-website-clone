// src/components/CustomButton.jsx

import { Button } from '@mui/material';

const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        background: 'linear-gradient(90deg, #8DC53E 0%, #1A4151 103.11%) !important',
        color: '#fff',
        textTransform: 'none',
        borderRadius: 2,
        px: 3,
        py: 1,
        fontWeight: 'bold',
        '&:hover': {
          opacity: 0.9,
        },
        ...props.sx, // allow overriding styles if needed
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
