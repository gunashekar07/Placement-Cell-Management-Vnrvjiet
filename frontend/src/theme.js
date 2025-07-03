import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e88e5', // A vibrant blue
      light: '#6ab7ff',
      dark: '#005cb2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#26a69a', // A teal color
      light: '#64d8cb',
      dark: '#00766c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    error: {
      main: '#e53935',
      light: '#ff6f60',
      dark: '#ab000d',
    },
    success: {
      main: '#43a047',
      light: '#76d275',
      dark: '#00701a',
    },
    warning: {
      main: '#fb8c00',
      light: '#ffbd45',
      dark: '#c25e00',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a',
      disabled: '#b0bec5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2.2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.8rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.6rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.4rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.2rem',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1.1rem',
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '0.9rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.9rem',
    },
    button: {
      fontWeight: 500,
      fontSize: '0.9rem',
      textTransform: 'none',
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.8rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '30px',
        padding: '8px 24px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 5px 10px rgba(0,0,0,0.15)',
        },
      },
      contained: {
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '12px',
      },
      elevation1: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
      elevation2: {
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.07)',
      },
      elevation3: {
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
      },
    },
    MuiCard: {
      root: {
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.07)',
        transition: 'transform 0.25s, box-shadow 0.25s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiTableCell: {
      root: {
        padding: '16px',
      },
      head: {
        backgroundColor: '#f5f7fa',
        color: '#2c3e50',
        fontWeight: 600,
      },
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: '#f9fafc',
        },
      },
    },
    MuiChip: {
      root: {
        borderRadius: '16px',
      },
    },
    MuiAppBar: {
      colorPrimary: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
    },
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
      },
    },
    MuiDivider: {
      root: {
        margin: '16px 0',
      },
    },
  },
});

export default theme; 