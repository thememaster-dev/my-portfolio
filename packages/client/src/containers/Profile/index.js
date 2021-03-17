import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import SocialLinks from './SocialLinks';

const useStyles = makeStyles((theme) => ({
  profileCard: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#273747',
    flexDirection: 'column',
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  nameTitle: {
    color: '#fff',
  },
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <div className={classes.profileCard}>
      <Avatar
        alt='Ariful islam'
        src='https://drscdn.500px.org/photo/1029837964/q%3D80_m%3D1500/v2?sig=60a73facc1af265db4ee46514c9fc088faad590df036501de92f352ed1f06ad5'
        className={classes.large}
      />
      <Typography className={classes.nameTitle} variant='h4' gutterBottom>
        Ariful islam
      </Typography>
      <SocialLinks />
    </div>
  );
};

export default Profile;
