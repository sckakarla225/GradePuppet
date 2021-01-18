import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// COMPONENTS
import { Content } from '../components/Grades/Content'; 

// CONTEXT
import { GradeContext } from '../context/GradeContext';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
}));

export const CreateGrade = () => {
    const classes = useStyles();

    const { teacher, assignments } = useContext(GradeContext); 
    const [studentName, setStudentName] = useState('');
    const [content, setContent] = useState(''); 
    const [isLoading, setIsLoading] = useState(true); 
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
                
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Content />
                </Grid>
            </Grid>  
        </div>
    )
}
