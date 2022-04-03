import logo from './logo.svg';
import './App.css';
import { Button,Card,CardContent,CardActions,Badge } from '@mui/material';
import { Favorite,Star } from '@mui/icons-material'
import { createTheme,ThemeProvider } from '@mui/material/styles';



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
      <Button variant='contained' >Holaa</Button>
      <Card className='card'>
        <CardContent>
          <h1>Mira D:</h1>
          <div>
            <Badge badgeContent={20} color="secondary">
              <Favorite color='error'/>
            </Badge>
            <Badge badgeContent={5} color="primary">
              <Star color='error'/>
            </Badge>
          </div>
        </CardContent>
        <CardActions>
          <Button>lista</Button>
        </CardActions>
      </Card>
    </div>
    </ThemeProvider>
  );
}

export default App;
