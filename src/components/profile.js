import React, { Component } from 'react';
import LeftPanel from "./leftNavigationPanel";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
}));

export default function Profile(){
    const classes = useStyles();
    return (
        <Typography>Profile Screen</Typography>
    )
}