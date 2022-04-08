import './App.css';

import { createTheme,ThemeProvider } from '@mui/material/styles';
import Peliculas from './components/Peliculas/Peliculas';




function App() {
  
  const tema = createTheme({
    palette:{
      secondary:{
        main:"#ff0000"
      }
    }
  })

  

  return (
    <ThemeProvider theme={tema}>
      <div className="App">
        <h1>Pelis :D</h1>
        <Peliculas />
      </div>
    </ThemeProvider>
  );
}

export default App;
