import { createRoot } from 'react-dom/client';
import '@/css/style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/Layout.jsx';
import Home from '@/pages/Home.jsx';
import Shop from '@/components/Shop.jsx';
import SingleProduct from '@/components/SingleProduct.jsx';
import { Provider } from 'react-redux';
import store from './config/store/store';
import MainCart from './components/MainCart.jsx';
import CheckOut from './components/CheckOut.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/shop/:id',
        element: <SingleProduct />
      },
      {
        path: '/cart',
        element: <MainCart />
      },
      {
        path: '/checkout',
        element: <CheckOut />
      },
      // {
      //   path: '/dashboard',
      //   element: (
      //     <ProtectedRoutes
      //       authComponent={<Dashboard />}
      //       guestComponent={<BlogList />}
      //     />
      //   )
      // },
      // {
      //   path: '/blogs/:user_id',
      //   element: <ProtectedRoutes guestComponent={<Login />} authComponent={<UserAllBlog />}/>
      // },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
