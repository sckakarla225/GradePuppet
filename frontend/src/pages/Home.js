import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; 

// CONTEXT
import { GradeContext } from '../context/GradeContext'; 

export const Home = (props) => {
    const [name, setName] = useState(''); 
    const [course, setCourse] = useState(''); 
    const [grade, setGrade] = useState(6); 
    const { teacher, setTeacher } = useContext(GradeContext); 

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
        }).then(() => {
            props.history.push('/dashboard');
        }); 
    }

    return (
        <div>
            
        </div>
    )
}
