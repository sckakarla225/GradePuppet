import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// CONTEXT
import { GradeContext } from '../context/GradeContext'; 

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const EnterForm = () => {
    const classes = useStyles();
    const { teacher, setTeacher } = useContext(GradeContext); 

    const [name, setName] = useState(''); 
    const [course, setCourse] = useState(''); 
    const [grade, setGrade] = useState(6); 

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleGradeChange = (e) => {
        setGrade(e.target.value); 
    }

    const handleCourseChange = (e) => {
        setCourse(e.target.value); 
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        fetch('http://127.0.0.1:8000/api/create_teacher/', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
            }, 
            body: JSON.stringify({ name: name, course: course, grade_level: grade })
        }).then((response) => response.json()).then((data) => {
            console.log(data); 
            console.log("Teacher created successfully!"); 
            setTeacher(data); 
            console.log(teacher);
        }); 
    }

    return (
        <div>
            <h3>Enter Your Details to Get Started</h3>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="outlined-password-input"
                    label="Name"
                    placeholder="Ex. Mrs.Johnson"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={handleNameChange}
                    value={name}
                />
                <TextField
                    id="outlined-password-input"
                    label="Course Name"
                    placeholder="Ex. AP Psychology"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={handleCourseChange}
                    value={course}
                />
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
                <button
                    type="submit"
                    className="enter-button"
                    onClick={handleSubmit}
                >
                    GET STARTED!
                </button>
            </form>
        </div>
    )
}
