import React from 'react';
import { Link } from 'react-router-dom'; 

export const GradeDB = () => {
    return (
        <div id="grade-db-container">
            <h1 style={{ marginLeft: '20px', fontSize: '45px' }}>ADD A NEW GRADE!</h1>
            <p style={{ marginLeft: '20px', marginTop: '25px' }} id="db-p-tag">Enter your student's info and their answers and let our AI grading tool take care of the rest!</p>
            <Link to="/grade" id="go-button">GO!</Link>
        </div>
    )
}
