import React from 'react'; 
import '../../App.css';
import logo from '../../logo.svg'; 

export const Logo = () => {
    return (
        <div className="logo-header">
            <img src={logo} className="logo-image" />
            <h1 id="logo-header-title">GradePuppet</h1>
            <p id="logo-tagline">Less grading. More teaching.</p>
        </div>
    )
}
