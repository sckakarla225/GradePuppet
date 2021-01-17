import React, { useContext } from 'react';

// CONTEXT
import { GradeContext } from '../context/GradeContext'; 

export const TeacherInfo = () => {
    const { teacher, assignments, grades } = useContext(GradeContext); 

    return (
        <div>
            
        </div>
    )
}
