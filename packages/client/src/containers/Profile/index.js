import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <Paper>
      <Avatar
        alt='Ariful islam'
        src='https://drscdn.500px.org/photo/1009073375/m%3D2048/v2?sig=bbdb8b7d561e7084f4942d0963e2612d8d73eeeac8ef7f8a89c94c1830b9b3a1'
        className={classes.large}
      />
    </Paper>
  );
};

export default Profile;
