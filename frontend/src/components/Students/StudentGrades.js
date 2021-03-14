import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css';

import { GradeContext } from '../../context/GradeContext'; 

const useStyles = makeStyles((theme) => ({
    icon: {
        float: 'right',
        marginTop: '-55px',
        fontSize: '40px',
        marginRight: '10px',
    },
    p: {
        fontSize: '25px',
        paddingTop: '5px',
        paddingLeft: '10px',
    },
    grade: {
        float: 'right', 
        marginTop: '-65px', 
        fontSize: '45px', 
        marginRight: '10px',
    }
}));

export const StudentGrades = ({ studentGrades }) => {
    const { assignments } = useContext(GradeContext); 
    const classes = useStyles(); 

    return (
        <div id="students-grades-container">
            <h1 style={{ marginLeft: '20px' }}>GRADES</h1>
            {studentGrades ? studentGrades.map((grade) => (
                <div style={{ 
                    backgroundColor: 'gray', 
                    width: '1250px', 
                    height: '65px', 
                    marginLeft: '20px',
                }}>
                    <p className={classes.p}>{grade ? 
                        assignments.find(assignment => assignment.id === grade.assignment).name
                    : ""}</p>
                    <p className={classes.grade} id="student-grade">{grade ? grade.grade : ""}</p>
                </div>
            )) : ""}
        </div>
    )
}
