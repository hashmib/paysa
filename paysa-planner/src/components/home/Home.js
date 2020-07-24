import React, {useState} from 'react';
import {
	Link as RouterLink
} from 'react-router-dom'


function Home() {


  return (
    <div className="Home">
    	HOME
    	<RouterLink to="/login">
    		<button > Log Out </button>
    	</RouterLink>
    </div>
  );
}

export default Home;
