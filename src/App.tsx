import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';
import { Contacts, Home } from './pages/home/Home';
import { About } from './pages/home/About';
import NavBar from './components/navbar';
import GreenMaps from './pages/projects/GreenMaps';
import ScrollTop from './components/scrollTop';
import YawNN from './pages/projects/YawNN';
import JCompiler from './pages/projects/JCompiler';
import Pandemic from './pages/projects/Pandemic';
import Sentiment from './pages/projects/Sentiment';
import GameDev from './pages/projects/GameDev';
import MathsArt from './pages/maths-art/MathsArtListing';
import Apollo from './pages/maths-art/_apollo';
import Lotfollah from './pages/maths-art/_lotfollah';
import Radials from './pages/maths-art/_radials';
import './styles.scss';
import BlogIntro from './pages/blog/BlogListing';
import { CV, ServiceCV, TechCV } from './pages/cv';
import ColorModeToggle, { ColorModeContextProvider } from './components/colorModeToggle';
import { MdxBlogPost } from './components/blogPost';
import { Title } from './components/title';
import { ProjectsOverview } from './pages/projects/ProjectsOverview';
import { DoubleBack } from './pages/projects/double-back/DoubleBack';
import { IsaacRedesign } from './pages/work/IsaacRedesign';

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <ScrollTop />
      <title>jaycie brown</title>
      {/* <ColorModeToggle /> */}
      <Outlet />
    </>,
    children: [
      {
        path: '/',
        element: <>
          <title>jaycie ⋅ home</title>
          <Home />
        </>
      },
      {
        path: '/about',
        element: <>
          <title>jaycie ⋅ about</title>
          <header>
            <Title />
          </header>
          <NavBar />
          <About />
        </>
      },
      {
        path: '/contacts',
        element: <>
          <title>jaycie ⋅ contacts</title>
          <header>
            <Title />
          </header>
          <NavBar />
          <Contacts />
        </>
      },
      {
        path: '/cv',
        element: <>
          <title>jaycie ⋅ cv</title>
          <NavBar />
          <Outlet />
        </>,
        children: [
          {
            path: '/cv',
            element: <CV />
          },
          {
            path: '/cv/tech',
            element: <TechCV />
          },
          {
            path: '/cv/service',
            element: <ServiceCV />
          }
        ]
      },
      {
        path: '/blog',
        element: <>
          <title>jaycie ⋅ blog</title>
          <header>
            <Title />
          </header>
          <NavBar />
          <BlogIntro />
        </>
      },
      {
        path: '/blog/:id',
        element: <>
          <NavBar />
          <MdxBlogPost />
        </>
      },
      {
        path: '/work',
        element: <>
          <title>jaycie ⋅ work</title>
          <NavBar />
          <Outlet />
        </>,
        children: [
          {
            path: '/work/isaac-redesign',
            element: <IsaacRedesign />
          }
        ]
      },
      {
        path: '/projects',
        element: <>
          <title>jaycie ⋅ projects</title>
          <NavBar />
          <Outlet />
        </>,
        children: [
          {
            path: '/projects',
            element: <ProjectsOverview />
          },
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
          },
          {
            path: '/projects/double-back',
            element: <DoubleBack />
          },
          {
            path: '/projects/double-back/:page',
            element: <DoubleBack />
          }
        ]
      },
      {
        path: '/gamedev',
        element: <>
          <title>jaycie ⋅ game dev</title>
          <NavBar />
          <GameDev />
        </>
      },
      {
        path: '/maths-art',
        element: <>
          <title>jaycie ⋅ maths art</title>
          <NavBar />
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
