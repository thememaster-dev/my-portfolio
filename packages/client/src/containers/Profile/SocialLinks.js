import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: '#fff',
  },
}))(IconButton);

const SocialLinks = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <a
        href='https://www.facebook.com/ariful25278/'
        target='__blank'
        rel='noopener noreferrer'
      >
        <ColorButton color='primary'>
          <FacebookIcon />
        </ColorButton>
      </a>
      <a
        href='https://github.com/arifulbgt4'
        target='__blank'
        rel='noopener noreferrer'
      >
        <ColorButton color='primary'>
          <GitHubIcon />
        </ColorButton>
      </a>
      <a
        href='https://www.linkedin.com/in/ariful25278/'
        target='__blank'
        rel='noopener noreferrer'
      >
        <ColorButton color='primary'>
          <LinkedInIcon />
        </ColorButton>
      </a>
    </div>
  );
};

export default SocialLinks;
