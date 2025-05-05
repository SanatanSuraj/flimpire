import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0% 0',
  },

  image: {
    width: '100%',
    height: '80px',
  },
  links: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  genreImages: {
    filter: theme.palette.mode === 'light' ? 'light' : 'invert(1)',
  },
}));
