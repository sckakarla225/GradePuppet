import React, { useState, useContext } from 'react';

// CONTEXT
import { GradeContext } from '../context/GradeContext';

export const CreateGrade = () => {
    const { teacher, assignments } = useContext(GradeContext); 
    const [studentName, setStudentName] = useState('');
    const [content, setContent] = useState(''); 
    const [isLoading, setIsLoading] = useState(true); 
    const [grade, setGrade] = useState(0); 

    const [assignment, setAssignment] = useState({}); 
    const [student, setStudent] = useState({}); 

    const createStudent = () => {
        fetch('http://127.0.0.1:8000/api/create_student/', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json', 
            }, 
            body: JSON.stringify({ teacher: teacher, name: studentName })
        }).then((response) => response.json()).then((data) => {
            console.log(data); 
            console.log("Student created successfully!"); 
            setStudent(data); 
            console.log(student); 
        }); 
    }

    const addGrade = () => {
        fetch('http://127.0.0.1:8000/api/add_grade/', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
            }, 
            body: JSON.stringify({ teacher: teacher, student: student, assignment: assignment, content: content })
        }).then((response) => response.json()).then((data) => {
            console.log(data); 
            console.log("Grade added successfully!"); 
            setGrade(data.grade); 
            if (grade !== 0) {
                setIsLoading(false); 
            } 
        });
    }

    const onGradeClick = () => {
        createStudent(); 
        if (student !== '') {
            addGrade(); 
        }
    }

    return (
        <div>
            
        </div>
    )
}
