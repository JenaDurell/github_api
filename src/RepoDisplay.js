import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import Masonry from 'react-masonry-css'

const RepoDisplay = ({name, fullName, description, language, link}) => {
    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
      };

      return(
        <div>
        <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
          <h5>Name: {name}</h5>
          <h5>Full Name: {fullName}</h5>
        <h5>Description: {description}</h5>
       {language ? ( <h5>Language: {language}</h5> ) : ('')}
       <a href={link}>Link</a> 

      </Masonry>

          </div>
      )
}
export default RepoDisplay