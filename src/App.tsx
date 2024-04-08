import React from 'react';
import './App.css';
import ConfigurationCollector from './pages/configurationCollector';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppBar, Typography } from '@mui/material';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <AppBar position={'static'}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 2 }}>
              Dynamic Cloud Configuration Platform
          </Typography>
        </AppBar>
        <ConfigurationCollector/>
      </div>
    </Provider>

  );
}

export default App;
