import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';

// COMPONENTS
import { Content } from '../components/Grades/Content'; 

// CONTEXT
import { GradeContext } from '../context/GradeContext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
    },
    input: {
        textAlign: 'center', 
        width: 300,   
        marginLeft: 200,
    }, 
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: 300,
        marginLeft: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const CreateGrade = () => {
    const classes = useStyles();

    const { teacher, assignments } = useContext(GradeContext); 
    const [studentName, setStudentName] = useState('');
    const [content, setContent] = useState(''); 
    // const [isLoading, setIsLoading] = useState(true); 
    const [grade, setGrade] = useState(0); 

    const [assignment, setAssignment] = useState({}); 
    const [student, setStudent] = useState({}); 

    const createStudent = () => {
        fetch('http://127.0.0.1:8000/api/create_student/', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json', 
            }, 
            body: JSON.stringify({ teacher: teacher, name: studentName })
        }).then((response) => response.json()).then((data) => {
            console.log(data); 
            console.log("Student created successfully!"); 
            setStudent(data); 
            console.log(student); 
        }); 
    }

    const addGrade = () => {
        fetch('http://127.0.0.1:8000/api/add_grade/', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
            }, 
            body: JSON.stringify({ teacher: teacher, student: student, assignment: assignment, content: content })
        }).then((response) => response.json()).then((data) => {
            console.log(data); 
            console.log("Grade added successfully!"); 
            setGrade(data.grade); 
            if (grade !== 0) {
                setIsLoading(false); 
            } 
        });
    }

    const onGradeClick = () => {
        createStudent(); 
        if (student !== '') {
            addGrade(); 
        }
    }

    return (
        <div style={{ backgroundColor: "" }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <h1 id="enter-student-name">ENTER STUDENT NAME:</h1>
                    <TextField 
                        id="outlined-basic" 
                        label="Student Name" 
                        variant="outlined" 
                        className={classes.input}
                        id="enter-student-name-input"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                    />
                    <h1 id="pick-assignment">PICK ASSIGNMENT:</h1>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            My Assignments
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            
                        
                            displayEmpty
                            className={classes.selectEmpty}
                            id="pick-assignment-input"
                            onChange={(e) => setAssignment(e.target.value)}
                        >
                            {assignments.map((assignment) => (
                               <MenuItem value={assignment}>{assignment.name}</MenuItem> 
                            ))}
                        </Select>
                    </FormControl>
                    <h1 id="grade-box-header">THE GRADE:</h1>
                    <div id="grade-box">
                        <h1 id="grade-value">50</h1>
                    </div>
                    <Link to="/dashboard" id="continue-grade-button">CONTINUE</Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Content content={content} setContent={setContent} onGradeClick={onGradeClick} />
                </Grid>
            </Grid>  
        </div>
    )
}
