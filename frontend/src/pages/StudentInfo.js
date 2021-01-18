import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// COMPONENTS
import { StudentGrades } from '../components/Students/StudentGrades'; 

// CONTEXT
import { GradeContext } from '../context/GradeContext'; 

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
}));

export const StudentInfo = () => {
    const classes = useStyles();

    const { studentID } = useParams(); 
    const { students } = useContext(GradeContext); 
    const [student, setStudent] = useState({}); 
    const [studentGrades, setStudentGrades] = useState([]); 

    const getStudentGrades = () => {
        fetch(`http://127.0.0.1:8000/api/student_grades/${studentID}/`).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data); 
            console.log("Student Data Recieved"); 
            setStudentGrades(data); 
            console.log(studentGrades); 
        }); 
    }

    useEffect(() => {
        const student = students.find(student => student.id === studentID); 
        setStudent(student); 
        getStudentGrades(); 
    }, []); 

    return (
        <div style={{ backgroundColor: ''}}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                
                </Grid>
                <Grid item xs={12} sm={6}>
                
                </Grid>
                <Grid item xs={12}>
                    <StudentGrades />
                </Grid>
            </Grid>
        </div>
    )
}
