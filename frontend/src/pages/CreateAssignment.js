import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// CONTEXT
import { GradeContext } from '../context/GradeContext';

// COMPONENTS
import { Rubric } from '../components/Assignments/Rubric'; 

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    input: {
        textAlign: 'center', 
        width: 700,   
        marginLeft: 630,
        marginBottom: -50, 
    }, 
}));

export const CreateAssignment = () => {
    const classes = useStyles();

    const { teacher } = useContext(GradeContext); 
    const [assignmentName, setAssignmentName] = useState('');
    const [rubric, setRubric] = useState(''); 
    const [questions, setQuestions] = useState({}); 

    const createAssignment = () => {
        try {
            fetch('http://127.0.0.1:8000/api/create_assignment/', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json', 
                }, 
                body: JSON.stringify({ teacher: teacher, name: assignmentName, rubric: rubric })
            }).then((response) => response.json()).then((data) => {
                console.log(data); 
                console.log("Assignment created!"); 
            });
        } catch (error) {
            console.log(error); 
            console.log("Assignment not created"); 
        }
    }

    // Create Questions and Answers Object from onChange

    // Format Rubric Function to send to DB
    
    return (
        <div style={{ backgroundColor: "" }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <h1 id="enter-assignment-name">ENTER ASSIGNMENT NAME:</h1>
                    <TextField 
                        id="outlined-basic" 
                        label="Assignment Name" 
                        variant="outlined" 
                        className={classes.input}
                        id="enter-assignment-name-input"
                    />
                </Grid>
                <Grid item xs={12}>
                    <h1 id="create-rubric-here">CREATE YOUR RUBRIC HERE!</h1>
                    <Rubric />
                </Grid>
            </Grid>  
        </div>
    )
}
