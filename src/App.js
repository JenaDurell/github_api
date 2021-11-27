import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import RepoDisplay from './RepoDisplay';
import Masonry from 'react-masonry-css';


//TODO paginate
//TODO sort results
const url = 'https://api.github.com/users/faradayio/repos?per_page=100&page=1'

function App() {

  //set initial states
  const [allRepoInfo, setAllRepoInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  //multiple breakpoints for responsiveness
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  //when page loads make api call once
  useEffect(() => {
    getGitRepoInfo();
  }, [])

  //axios returns transformed data so we don't have to parse JSON response
  const getGitRepoInfo = async () => {
    const response = await axios.get(url)
    console.log('hello', response.data)
    setAllRepoInfo(response.data.sort((a, b) => a.name.localeCompare(b.name)))
  };

  //once we get response info we stop displaying loading
  useEffect(() => {
    if (allRepoInfo.length !== 0) {
      setIsLoading(false);
    }
  }, [allRepoInfo]);

  return (
    <div className="App">
      <header className="App-header">
       <h1>faraday_public_access 👩🏽‍💻</h1>
      </header>
      {/* Mansonry component allows for each repo to be displayed in its own tile once api response is mapped over */} .
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        >
        {isLoading ? (
          <h1 className='loading'>Results are on the way...</h1>
        ) : (
        allRepoInfo.map((repo) => (
          <div key = {repo.id}>
            <RepoDisplay
            name={repo.name}
            fullName={repo.full_name}
            description={repo.description}
            language={repo.language || ''}
            link={repo.html_url} />
          </div>
        ))
        )}
        </Masonry>
      
        
    </div>
  );
}

export default App;
