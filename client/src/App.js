import './App.css';

import { createTheme,ThemeProvider } from '@mui/material/styles';
import Peliculas from './components/Peliculas/Peliculas';
import Nav from './components/Nav/Nav';

import {Route,Routes} from "react-router-dom"


function App() {
  
  const tema = createTheme({
    palette:{
      primary:{
        main:"#212121"
      },
      secondary:{
        main:"#b71c1c"
      }
    }
  })

  
  return (
    <ThemeProvider theme={tema}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path='/' element={<Peliculas />} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
