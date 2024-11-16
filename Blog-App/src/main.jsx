import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import BlogList from './pages/BlogList.jsx';
import Singleblog from './pages/Singleblog.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserAllBlog from './pages/UserAllBlog.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <BlogList /> // Default homepage for guests
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoutes
            authComponent={<Dashboard />}
            guestComponent={<BlogList />} // Redirect to homepage for guests
          />
        )
      },
      {
        path: '/:id',
        element: <ProtectedRoutes guestComponent={<Login />} authComponent={<Singleblog />}/>
      },
      {
        path: '/blogs/:user_id',
        element: <ProtectedRoutes guestComponent={<Login />} authComponent={<UserAllBlog />}/>
      },
      {
        path: '/profile',
        element: <ProtectedRoutes guestComponent={<Login />} authComponent={<Profile />}/>
      },
      {
        path: 'login',
        element: <ProtectedRoutes guestComponent={<Login />} authComponent={<Dashboard />}/>
      },
      {
        path: 'register',
        element: <ProtectedRoutes guestComponent={<Register />} authComponent={<Dashboard />}/> 
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
