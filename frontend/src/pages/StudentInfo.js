import React, { useContext, useState, useEffect } from 'react';
import "../App.css"; 
import { useParams, useHistory } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// COMPONENTS
import { StudentGrades } from '../components/Students/StudentGrades'; 

// CONTEXT
import { GradeContext } from '../context/GradeContext'; 

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    icon: {
        fontSize: '80px',
        marginRight: '10px',
        marginLeft: '200px',
        marginTop: '30px',
        marginBottom: '-70px',
    },
}));

export const StudentInfo = () => {
    const classes = useStyles();
    const history = useHistory();

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
        <div style={{ backgroundColor: '#0ca559'}}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                <ArrowBackIosIcon className={classes.icon} onClick={() => history.push('/dashboard')} />
                    <div id="student-info-container">
                        <p id="student-info-name-header">STUDENT NAME:</p>
                        <h1 id="student-info-name">{student.name}</h1>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div>
                    <div class="numberCircle">93</div>
                    <p id="class-mastery-level">Student Mastery Level</p>
                </div>
                </Grid>
                <Grid item xs={12}>
                    <StudentGrades studentGrades={studentGrades} />
                </Grid>
            </Grid>
        </div>
    )
}
