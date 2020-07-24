import React, {useState} from 'react';
import {
	Link as RouterLink
} from 'react-router-dom'


function Home() {

// this is a temporary home page
// we need to make it look nice

[userID, setUserId] = setState("001") 
// the home component needs to have a state variable for user id
// that's how we know what user is logged in 

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
