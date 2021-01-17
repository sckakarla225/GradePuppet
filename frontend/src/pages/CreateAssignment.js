import React, { useState, useContext } from 'react';

// CONTEXT
import { GradeContext } from '../context/GradeContext';

export const CreateAssignment = () => {
    const { teacher } = useContext(GradeContext); 
    const [assignmentName, setAssignmentName] = useState('');
    const [rubric, setRubric] = useState(''); 
    const [questions, setQuestions] = useState({}); 

    const createAssignment = () => {
        try {
            fetch('http://127.0.0.1:8000/api/create_assignment/', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json', 
                }, 
                body: JSON.stringify({ teacher: teacher, name: assignmentName, rubric: rubric })
            }).then((response) => response.json()).then((data) => {
                console.log(data); 
                console.log("Assignment created!"); 
            });
        } catch (error) {
            console.log(error); 
            console.log("Assignment not created"); 
        }
    }

    // Create Questions and Answers Object from onChange

    // Format Rubric Function to send to DB
    
    return (
        <div>
            <h1>CREATE ASSIGNMENT</h1>
        </div>
    )
}
