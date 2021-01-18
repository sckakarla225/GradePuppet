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

export const CreateAssignment = (props) => {
    const classes = useStyles();

    const { teacher } = useContext(GradeContext); 
    const [assignmentName, setAssignmentName] = useState('');
    const [rubric, setRubric] = useState(''); 
    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');

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
            props.history.push("/dashboard");
        }
    }

    // Format Rubric Function to send to DB

    const onSend = () => {
        setRubric(question1.concat(answer1).concat(question2).concat(answer2)); 
        createAssignment(); 
    }
    
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
                        onChange={(e) => setAssignmentName(e.target.value)}
                        value={assignmentName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <h1 id="create-rubric-here">CREATE YOUR RUBRIC HERE!</h1>
                    <div style={{
            backgroundColor:'green',
            height: '375px', 
            width: '1000px',
            margin: 'auto',
        }}>
            <div>
                <div style={{
                    backgroundColor: 'gray', 
                    height: '80px', 
                    width: '400px',
                    display: 'inline-block',
                    marginLeft: '70px',
                    fontSize: '25px', 
                    paddingRight: '15px',
                    marginTop: '15px',
                }}>
                    Q1: <textarea style={{
                        marginTop: '20px',
                        fontSize: '14px',
                    }} id="rubric-text-area" value={question1} onChange={(e) => setQuestion1(e.target.value)}></textarea>
                </div>
                    <div style={{
                        backgroundColor: 'gray', 
                        height: '80px', 
                        width: '400px',
                        display: 'inline-block',
                        marginLeft: '40px',
                        fontSize: '25px',
                    }}>
                        A1: <textarea style={{
                            marginTop: '20px',
                            fontSize: '14px',
                        }} id="rubric-text-area" value={answer1} onChange={(e) => setAnswer1(e.target.value)}></textarea>
                    </div>
                    </div>
                    <div>
                        <div style={{
                            backgroundColor: 'gray', 
                            height: '80px', 
                            width: '400px',
                            display: 'inline-block',
                            marginLeft: '70px',
                            fontSize: '25px', 
                            paddingRight: '15px',
                            marginTop: '15px',
                        }}>
                            Q2: <textarea style={{
                                marginTop: '20px',
                            }} id="rubric-text-area" value={question2} onChange={(e) => setQuestion2(e.target.value)}></textarea>
                        </div>
                        <div style={{
                            backgroundColor: 'gray', 
                            height: '80px', 
                            width: '400px',
                            display: 'inline-block',
                            marginLeft: '40px',
                            fontSize: '25px',
                        }}>
                            A2: <textarea style={{
                                marginTop: '20px',
                                fontSize: '14px',
                            }} id="rubric-text-area" value={answer2} onChange={(e) => setAnswer2(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div>
                        <div style={{
                            backgroundColor: 'gray', 
                            height: '80px', 
                            width: '400px',
                            display: 'inline-block',
                            marginLeft: '70px',
                            fontSize: '25px', 
                            paddingRight: '15px',
                            marginTop: '15px',
                        }}>
                            Q3: <textarea style={{
                                marginTop: '20px',
                                fontSize: '14px',
                            }} id="rubric-text-area"></textarea>
                        </div>
                        <div style={{
                            backgroundColor: 'gray', 
                            height: '80px', 
                            width: '400px',
                            display: 'inline-block',
                            marginLeft: '40px',
                            fontSize: '25px',
                        }}>
                            A3: <textarea style={{
                                marginTop: '20px',
                                fontSize: '14px',
                            }} id="rubric-text-area"></textarea>
                        </div>
                        <div>
                            <AddBoxIcon className={classes.icon} color="primary" />
                        </div>
                    </div>
                    <Link 
                        to="/dashboard" 
                        id="create-assignment-button"
                        onClick={() => onSend()}
                    >
                        CREATE ASSIGNMENT</Link>
                </div>
                </Grid>
            </Grid>  
        </div>
    )
}
