import React, { useEffect, useContext } from 'react'; 

import { GradeContext } from '../context/GradeContext';

export const Dashboard = () => {
    const { teacher, students, getAssignments, getGrades, getStudents } = useContext(GradeContext); 

    useEffect(() => {
        getAssignments(teacher.id); 
        getGrades(teacher.id); 
        getStudents(teacher.id); 
    }, []); 

    return (
        <div>
            <h1>DASHBOARD</h1>
            {students ? students.map((student) => {
                return (
                    <div>
                        <p>{student.name}</p>
                        <button>{">"}</button>
                    </div>
                )
            }) : ""}
        </div>
    )
}
