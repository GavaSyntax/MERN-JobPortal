import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'
import Modal from 'react-modal';



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
Modal.setAppElement('#root'); // Assuming '#root' is the root element of your React app

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
