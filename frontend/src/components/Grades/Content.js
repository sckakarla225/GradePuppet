import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    paper: {
        height: '800px',
        marginTop: '40px', 
        width: '700px',
    }
}));

export const Content = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <h1 id="student-answers-header">Enter Student Answers Here:</h1>
                <textarea placeholder="Paste Content Here" id="content-box" row="10" columns="50" >

                </textarea>
            </Paper>
        </div>
    );
}

