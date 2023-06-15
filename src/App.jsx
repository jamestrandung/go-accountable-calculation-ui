import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {
  Container, Button,
} from '@mui/material';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import CalculationParser from './pages/LogParser/CalculationParser';
import JSONComparer from './pages/JSONComparer/JSONComparer';
import JSONDecompressor from './pages/JSONDecompressor/JSONDecompressor';

export default function App() {
  return (
    <Router>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Box sx={{ flexGrow: 1, padding: '5px' }}>
            <Button>
              <Link to="./" style={{ color: 'white', textDecoration: 'none' }}>
                Parse Log
              </Link>
            </Button>
            <Button>
              <Link to="./compare" style={{ color: 'white', textDecoration: 'none' }}>
                Compare JSON
              </Link>
            </Button>
            <Button>
              <Link to="./decompress" style={{ color: 'white', textDecoration: 'none' }}>
                Decompress JSON
              </Link>
            </Button>
          </Box>
        </AppBar>

        <Switch>
          <Route path="*/decompress">
            <JSONDecompressor />
          </Route>
          <Route path="*/compare">
            <JSONComparer />
          </Route>
          <Route>
            <CalculationParser />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
