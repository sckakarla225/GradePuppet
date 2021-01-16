import React from 'react'; 

// COMPONENTS
import { EnterForm } from '../components/EnterForm'; 

export const Home = () => {

    return (
        <div className="home-container">
            <h1>GradePuppet</h1>
            <p>Less time grading, more time teaching.</p>
            <EnterForm />
        </div>
    )
}
