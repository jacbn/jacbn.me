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
import BlogIntro from './pages/blog';
import CV from './pages/cv';
import ColorModeToggle, { ColorModeContextProvider } from './components/colorModeToggle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <ScrollTop /> 
      <ColorModeToggle />
      <Outlet />
    </>,
    children: [
      {
        path: '/',
        element: <>
          <header>
            <Title />
            <NavBar showName={false} />
          </header>
          <Home />
        </>
      },
      {
        path: '/about',
        element: <>
          <header>
            <Title />
            <NavBar showName={false} />
          </header>
          <About />
        </>
      },
      {
        path: '/contacts',
        element: <>
          <header>
            <Title />
            <NavBar showName={false} />
          </header>
          <Contacts />
        </>
      },
      {
        path: '/cv',
        element: <>
          <header>
            <NavBar showName={true} />
          </header>
          <CV />
        </>
      },
      {
        path: '/blog',
        element: <>
          <header>
            <Title />
            <NavBar showName={false} />
          </header>
          <BlogIntro />
        </>
      },
      {
        path: '/blog/:id',
        element: <>
          <header>
            <NavBar showName={true} />
          </header>
          <BlogPost />
        </>
      },
      {
        path: '/projects',
        element: <>
          <header>
            <NavBar showName={true} />
          </header>
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
          <header>
            <NavBar showName={true} />
          </header>
          <GameDev />
        </>
      },
      {
        path: '/maths-art',
        element: <>
          <header>
            <NavBar showName={true} />
          </header>
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
        <ColorModeContextProvider>
          <RouterProvider router={router} />
        </ColorModeContextProvider>
      </React.StrictMode>
    );
};

export default App;
