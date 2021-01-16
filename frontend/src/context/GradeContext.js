import React, { createContext, useState } from 'react'; 


const GradeContext = createContext(); 

export const GradeContextProvider = (props) => {

    return (
        <GradeContext.Provider>
            { props.children }
        </GradeContext.Provider>
    )
}