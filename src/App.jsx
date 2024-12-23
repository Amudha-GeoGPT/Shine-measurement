import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import routes from './routes';

import './App.css';
import "./assets/scss/_abstracts.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import Store from "./store/store";

const router = createBrowserRouter(routes);

function App() {
  return (<Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>)
}

export default App;