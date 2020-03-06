import React from 'react';
import Container from '@material-ui/core/Container';
import Navbar from './Navbar'
import User from './User'
import Admin from './Admin'

export default function Home() {
  return (
    <div>
      <Navbar/>
	  <br/>

	  {/* All stuffs down here */}
      <Container>
	  	<User/>
      <Admin/>
      </Container>    
	
	</div>
  );
}
