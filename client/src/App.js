import React from 'react';
import Navbar from './components/Navbar'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import 'normalize.css'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Container>
        <Typography component="p">heya</Typography>
      </Container>
    </div>
  );
}

export default App;
