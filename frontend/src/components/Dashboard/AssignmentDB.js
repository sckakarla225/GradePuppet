import React from 'react';
import { Link } from 'react-router-dom'

export const AssignmentDB = () => {
    return (
        <div id="assignment-db-container">
            <h1 style={{ marginLeft: '20px', fontSize: '45px' }}>CREATE AN ASSIGNMENT!</h1>
            <p style={{ marginLeft: '20px', marginRight: '25px' }} id="db-p-tag">Add an assignment with your own FRQ rubric/scoring guidelines for our AI grading tool to use!</p>
            <Link to="/assignment" id="go-button">GO!</Link>
        </div>
    )
}
