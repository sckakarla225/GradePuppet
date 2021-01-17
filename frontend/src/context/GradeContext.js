import React, { createContext, useState } from 'react'; 


export const GradeContext = createContext(); 

export const GradeContextProvider = (props) => {
    const [teacher, setTeacher] = useState({}); 
    const [students, setStudents] = useState([]); 
    const [grades, setGrades] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const getStudents = (teacher_id) => {
        fetch(`http://127.0.0.1:8000/api/my_students/${teacher_id}/`).then(
            () => response.json()
        ).then((data) => {
            console.log(data); 
            console.log("Teacher students recieved successfully!"); 
            setStudents(data); 
        });
    }

    const getGrades = (teacher_id) => {
        fetch(`http://127.0.0.1:8000/api/my_grades/${teacher_id}/`).then(
            () => response.json()
        ).then((data) => {
            console.log(data); 
            console.log("Teacher grades recieved successfully!"); 
            setGrades(data); 
        });
    }

    const getAssignments = (teacher_id) => {
        fetch(`http://127.0.0.1:8000/api/my_assignments/${teacher_id}/`).then(
            () => response.json()
        ).then((data) => {
            console.log(data); 
            console.log("Teacher assignments recieved successfully!"); 
            setAssignments(data); 
        });
    }

    return (
        <GradeContext.Provider value={{ 
            teacher, setTeacher, students, setStudents, getGrades, getAssignments, grades, assignments, getStudents
        }}>
            { props.children }
        </GradeContext.Provider>
    )
}