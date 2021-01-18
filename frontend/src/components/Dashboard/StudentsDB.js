import React, { useContext } from 'react'; 
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
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
    }
}));

export const StudentsDB = ({ goToStudentPage, students }) => {
    const classes = useStyles(); 

    return (
        <div className="students-db-container">
            <h1 style={{ marginLeft: '20px' }}>MY STUDENTS</h1>
            {students ? students.map((student) => (
                <div style={{ 
                    backgroundColor: 'gray', 
                    width: '550px', 
                    height: '50px', 
                    marginLeft: '20px',
                }}>
                    <p className={classes.p}>{student.name}</p>
                    <ArrowForwardIosIcon className={classes.icon} onClick={() => goToStudentPage(student.id)} />
                </div>
            )) : ""}
        </div>
    )
}
