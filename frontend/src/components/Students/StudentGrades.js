import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css';

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

export const StudentGrades = () => {
    const classes = useStyles(); 

    return (
        <div id="students-grades-container">
            <h1 style={{ marginLeft: '20px' }}>GRADES</h1>
            <div style={{ 
                backgroundColor: 'gray', 
                width: '1250px', 
                height: '65px', 
                marginLeft: '20px',
            }}>
                <p className={classes.p}>(assignment name)</p>
                <p className={classes.grade} id="student-grade">(grade)</p>
            </div>
            <div style={{ 
                backgroundColor: 'gray', 
                width: '1250px', 
                height: '65px', 
                marginLeft: '20px',
            }}>
                <p className={classes.p}>(assignment name)</p>
                <p className={classes.grade} id="student-grade">(grade)</p>
            </div>
            <div style={{ 
                backgroundColor: 'gray', 
                width: '1250px', 
                height: '65px', 
                marginLeft: '20px',
            }}>
                <p className={classes.p}>(assignment name)</p>
                <p className={classes.grade} id="student-grade">(grade)</p>
            </div>
        </div>
    )
}
