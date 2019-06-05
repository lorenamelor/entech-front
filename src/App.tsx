import * as React from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import { Home, Survey, SignUp } from './pages';

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/' component={Home} />
          <Route exact path='/survey/:surveyId' component={Survey} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
