import React, { createContext, useState } from 'react'; 


export const GradeContext = createContext(); 

export const GradeContextProvider = (props) => {
    const [teacher, setTeacher] = useState({}); 

    return (
        <GradeContext.Provider value={{ teacher, setTeacher }}>
            { props.children }
        </GradeContext.Provider>
    )
}