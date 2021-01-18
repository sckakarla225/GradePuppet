import React, { useEffect, useContext } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// COMPONENTS
import { StudentsDB } from '../components/Dashboard/StudentsDB'; 
import { ClassMastery } from '../components/Dashboard/ClassMastery'; 
import { AssignmentDB } from '../components/Dashboard/AssignmentDB'; 
import { GradeDB } from '../components/Dashboard/GradeDB'; 

// CONTEXT
import { GradeContext } from '../context/GradeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export const Dashboard = (props) => {
    const classes = useStyles();

    const { teacher, students, getAssignments, getGrades, getStudents } = useContext(GradeContext); 

    if (teacher) {
      getAssignments(teacher.id); 
      getGrades(teacher.id); 
      getStudents(teacher.id); 
    }

    const studentPage = (studentID) => {
      props.history.push(`/student/${studentID}`);
    }

    return (
      <div style={{ backgroundColor: ''}}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={5}>
                <div>
                  <ClassMastery />
                </div>
                <div>
                  <StudentsDB students={students ? students : ""} goToStudentPage={studentPage} />
                </div>
            </Grid>
            <Grid item xs={12} sm={7}>
                <div>
                  <AssignmentDB />
                </div>
                <div>
                  <GradeDB />
                </div>
            </Grid>
          </Grid>
      </div>
    )
}
