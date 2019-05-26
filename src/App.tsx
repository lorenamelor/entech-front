import * as React from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';


// Pages

import { Home } from './pages';

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Route exact path='/' component={Home} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
