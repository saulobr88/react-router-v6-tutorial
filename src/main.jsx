import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom'

import App from './App'
import Index from "./routes/index";
import ErrorPage from './error-page'
import Root, {loader as rootLoader, action as rootAction} from './routes/root'
import Contact, {loader as contactLoader, action as contactAction} from './routes/contact'
import EditContact, {action as editAction} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "/contacts/:contactId",
            loader: contactLoader,
            action: contactAction,
            element: <Contact />,
          },
          {
            path: "/contacts/:contactId/edit",
            loader: contactLoader,
            action: editAction,
            element: <EditContact />,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/hello",
    element: <div>Hello world!</div>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*<App />*/}
    <RouterProvider router={router} />
  </React.StrictMode>
)
