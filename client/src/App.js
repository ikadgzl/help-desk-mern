import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from './components/Header';
import Spinner from './components/Spinner';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import NewTicket from './pages/NewTicket';
import Register from './pages/Register';

function App() {
  const { isLoggedIn, authStatus } = useAuth();

  if (!authStatus) return <Spinner />;

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
              <Route index element={<Home />} />
              <Route path='/new-ticket' element={<NewTicket />} />
            </Route>

            <Route
              path='/login'
              element={!isLoggedIn ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path='/register'
              element={!isLoggedIn ? <Register /> : <Navigate to='/' />}
            />
            <Route
              path='*'
              element={!isLoggedIn ? <Login /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </Router>

      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </>
  );
}

export default App;
