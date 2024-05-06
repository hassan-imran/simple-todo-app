import { useNavigate } from 'react-router-dom';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
// import UnAuth from './routes/401';
import SignIn from './routes/SignIn'

function App() {

  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (auth) {
    return (<><h1>Dashboard</h1></>);
  } else {
    return (<><SignIn /></>)
  }
}

export default App;
