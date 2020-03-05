import React from 'react';
import Navbar from './Navbar'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function Home() {
  return (
    <div>
      <Navbar/>
	  <br/>

	  {/* All stuffs down here */}
      <Container>
        <Typography component="p">heya</Typography>
      </Container>    
	
	</div>
  );
}
