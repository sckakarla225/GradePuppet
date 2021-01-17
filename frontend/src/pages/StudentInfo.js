import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

// CONTEXT
import { GradeContext } from '../context/GradeContext'; 

export const StudentInfo = () => {
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
        <div>
            
        </div>
    )
}
