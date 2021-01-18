import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '65px',
        marginTop: '10px',
        marginLeft: '470px',
    }
}));

export const Rubric = () => {
    const classes = useStyles();

    return (
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
                    A1: <textarea style={{
                        marginTop: '20px',
                        fontSize: '14px',
                    }} id="rubric-text-area"></textarea>
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
                    A2: <textarea style={{
                        marginTop: '20px',
                        fontSize: '14px',
                    }} id="rubric-text-area"></textarea>
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
            <Link to="/dashboard" id="create-assignment-button">CREATE ASSIGNMENT</Link>
        </div>
    )
}
