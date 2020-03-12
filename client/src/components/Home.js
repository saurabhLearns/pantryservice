import React from 'react';
import Container from '@material-ui/core/Container';
import Navbar from './Navbar'
import User from './User'
import Admin from './Admin'
import Login from './Login'

export default function Home() {
  return (
    <div>
      <Navbar/>
	  <br/>

	  {/* All stuffs down here */}
      <Container>
      <Login/>
	  	<User/>
      <Admin/>
      </Container>    
	
	</div>
  );
}
