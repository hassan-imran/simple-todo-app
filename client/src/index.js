import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './routes/About';
import SignIn from './routes/SignIn';
import NotFound from './routes/NotFound';
import TopNav from './TopNav';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <TopNav />
        <App />
      </>
    ),
    errorElement: (<NotFound />)
  },
  {
    path: "about",
    element: (
      <>
        <TopNav />
        <About />
      </>
    ),
    errorElement: (<NotFound />)
  },
  {
    path: "login",
    element: (
      <>
        <TopNav />
        <SignIn />
      </>
    ),
    errorElement: (<NotFound />)
  },
  {
    path: "*",
    element: (
      <>
        <TopNav />
        <NotFound />
      </>
    )
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
