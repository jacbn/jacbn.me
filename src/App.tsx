import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Contacts, Home } from './pages';
import Title from './components/title';
import NavBar from './components/navbar';
import GreenMaps from './pages/projects/greenmaps';
import ScrollTop from './components/scrollTop';
import YawNN from './pages/projects/yawnn';
import JCompiler from './pages/projects/jcompiler';
import Pandemic from './pages/projects/pandemic';
import Sentiment from './pages/projects/sentiment';
import GameDev from './pages/projects/gamedev';
import MathsArt from './pages/maths-art';
import Apollo from './pages/maths-art/_apollo';
import Lotfollah from './pages/maths-art/_lotfollah';
import Radials from './pages/maths-art/_radials';

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <ScrollTop /> 
      <Outlet />
    </>,
    children: [
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
        path: '/projects',
        element: <>
          <NavBar showName={true} />
          <Outlet />
        </>,
        children: [
          {
            path: '/projects/greenmaps',
            element: <GreenMaps />
          },
          {
            path: '/projects/yawnn',
            element: <YawNN />
          },
          {
            path: '/projects/jcompiler',
            element: <JCompiler />
          },
          {
            path: '/projects/pandemic',
            element: <Pandemic /> 
          },
          {
            path: '/projects/sentiment',
            element: <Sentiment />
          }
        ]
      },
      {
        path: '/gamedev',
        element: <>
          <NavBar showName={true} />
          <GameDev />
        </>
      },
      {
        path: '/maths-art',
        element: <>
          <NavBar showName={true} />
          <MathsArt />
        </>,
        children: [
          {
            path: '/maths-art/apollo',
            element: <Apollo />
          },
          {
            path: '/maths-art/lotfollah',
            element: <Lotfollah />
          },
          {
            path: '/maths-art/radials',
            element: <Radials />
          }
        ]
      },
    ]
  },
  
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
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww" />
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