import React, { useContext } from 'react';

// CONTEXT
import { GradeContext } from '../context/GradeContext'; 

export const TeacherInfo = () => {
    const { teacher, assignments, grades } = useContext(GradeContext); 

    return (
        <div>
            <h1>TEACHER INFO</h1>
            {teacher ? teacher.name : ''}
            {teacher ? teacher.grade_level: ''}
            {teacher ? teacher.course: ''}
            <h1>ASSIGNMENTS</h1>
            {assignments ? assignments.map((assignment) => (
                assignment.name
            )) : ""}
            <h1>GRADES</h1>
            {grades ? grades.map((grade) => {
                return (
                    <div>
                        <p>{grade.student.name}</p>
                        <p>{grade.grade}</p>
                    </div>
                )
            }) : ""}
        </div>
    )
}
