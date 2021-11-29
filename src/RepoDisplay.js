import React from 'react';
import './App.css';

//this component takes in the variables that are displayed in each individual tile. Not all repos have languages listed in the return, so there is a ternary in place to take care of these cases
const RepoDisplay = ({name, fullName, description, language, link}) => {

      return(
        <>
        <div className='title'>{name}</div>
        <div className='full-name'>{fullName}</div>
        {language ? ( <div className='language'> {language}</div> ) : ('')}
        <div className='desc'>{description}</div>
        <a href={link}>See For Yourself ↗️ </a> 
        </>
      )
}
export default RepoDisplay