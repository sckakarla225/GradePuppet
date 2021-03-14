import React from 'react'; 
import { Link } from 'react-router-dom';
import '../../App.css'; 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    input: {
        textAlign: 'center', 
        width: 300,   
        margin: 5,
        backgroundColor: 'white',
    }, 
    button: {
        display: 'block', 
        margin: 'auto', 
        marginTop: 30,
        width: 350, 
        height: 75,
        fontSize: 30,
        textDecoration: 'none', 
        border: 'none', 
        backgroundColor: 'rgba(151, 206, 176, 0.7)',
    }, 
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: 300,
        backgroundColor: 'white',
        
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const EnterForm = ({ 
    name, course, grade, handleNameChange, handleGradeChange, handleCourseChange, handleSubmit,
}) => {
    const classes = useStyles();

    return (
        <div className="enter-form-container">
            <p id="enter-form-header">Enter Your Details to Get Started!</p>
            <div>
                <TextField 
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined" 
                    placeholder="Ex. Mrs.Johnson"
                    value={name}
                    onChange={handleNameChange}
                    className={classes.input}
                    id="enter-form-input"
                />
            </div>
            <div>
                <TextField 
                    id="outlined-basic" 
                    label="Course Name" 
                    variant="outlined" 
                    placeholder="Ex. AP Psychology"
                    value={course}
                    onChange={handleCourseChange}
                    className={classes.input}
                    id="enter-form-input"
                />
            </div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Grade Level
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={grade}
                        onChange={handleGradeChange}
                        displayEmpty
                        className={classes.selectEmpty}
                        id="enter-form-input"
                    >
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Link to="/dashboard">
            <button
                type="submit"
                className={classes.button}
                onClick={() => {
                    handleSubmit();
                }}
                id="enter-form-button"
            >
                GET STARTED!
            </button>
            </Link>
        </div>
    )
}
