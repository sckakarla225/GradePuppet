import React, { useEffect, useContext } from 'react'; 

import { GradeContext } from '../context/GradeContext';

export const Dashboard = (props) => {
    const { teacher, students, getAssignments, getGrades, getStudents } = useContext(GradeContext); 

    useEffect(() => {
        getAssignments(teacher.id); 
        getGrades(teacher.id); 
        getStudents(teacher.id); 
    }, []); 

    const studentPage = (studentID) => {
      props.history.push(`/student/${studentID}`);
    }

    return (
      <div>
        
      </div>
    )
}
