import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import RepoDisplay from './RepoDisplay';
import Masonry from 'react-masonry-css'

//TODO paginate
const url = 'https://api.github.com/users/faradayio/repos?per_page=100&page=1'

function App() {

  const [allRepoInfo, setAllRepoInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  useEffect(() => {
    getGitRepoInfo();
  }, [])

  const getGitRepoInfo = async () => {
    const response = await axios.get(url)
    console.log('hello', response.data)
    setAllRepoInfo(response.data.sort((a, b) => a.name.localeCompare(b.name)))
  };


  useEffect(() => {
    if (allRepoInfo.length !== 0) {
      setIsLoading(false);
    }
    console.log('all',allRepoInfo);
  }, [allRepoInfo]);

  return (
    <div className="App">
      <header className="App-header">
       <h1>Repo Info</h1>
      </header>
      
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
      {isLoading ? (
        <h1>Results are on the way...</h1>
      ) : (
        allRepoInfo.map((repo) => (
          <div key = {repo.id} className = 'user-container'>
            <RepoDisplay
            name={repo.name}
            fullName={repo.fullName}
            description={repo.description}
            language={repo.language || ''}
            link={repo.html_url} />
          {/* <h5 >Name: {repo.name}</h5>
          <h5>Full Name: {repo.full_name}</h5>
          <h5>Description: {repo.description}</h5>
         {repo.language ? (<h5>Language: {repo.language}</h5>):('')} 
          <a href={repo.html_url}>link</a> */}
          </div>
        ))
        )}
        </Masonry>
      
        
    </div>
  );
}

export default App;
