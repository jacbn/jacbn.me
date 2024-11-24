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
import './styles.scss';
import BlogPost from './components/blogPost';

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
        path: '/blog/:id',
        element: <>
          <NavBar showName={true} />
          <BlogPost />
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

export const App = () => {
    return (
      <React.StrictMode>
        <main>
          <RouterProvider router={router} />
        </main>
      </React.StrictMode>
    );
};

export default App;
