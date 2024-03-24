import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Contacts, Home } from './pages';
import Title from './components/title';
import NavBar from './components/navbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Title />
      <NavBar showName={false} />
      <Home />
    </>
  },
  {
    path: '/about',
    element: <>
      <Title />
      <NavBar showName={false} />
      <About />
    </>
  },
  {
    path: '/contacts',
    element: <>
      <Title />
      <NavBar showName={false} />
      <Contacts />
    </>
  },
  {
    path: '/projects/:id',
    
  }
]);

interface AppProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const App = (props : AppProps) => {
    return (
      <React.StrictMode>
        <head>
          {/* i have tried, for genuinely hours, to get webpack to bundle
          css files. it does not. i have thus given up and written these
          unfortunate 3 loc instead. if you, dear reader, can figure
          out the problem with my webpack.config.js, or perhaps why 
          `import './main.css'` isn't causing webpack to bundle it, 
          please tell me. for now though, i have better things to do. */}
          <link rel="stylesheet" type="text/css" href="./styles/main.css" />
        </head>
        <body>
          <main>
            <RouterProvider router={router} />
          </main>
        </body>
      </React.StrictMode>
    );
};

export default App;