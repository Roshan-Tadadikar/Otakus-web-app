
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import './Style.css'
import Home from './Components/Home';
import RequiresAuth from './Components/RequiresAuth';
import Profile from './Components/Profile';
import Explore from './Components/Explore';
import IndividualPost from './Components/IndividualPost';

function App() {
  return (
    <div className="App">
      
      <Routes>
      <Route path='/' element={<RequiresAuth><Home/></RequiresAuth>} />
      <Route path='/singup' element={<Login />} />
      <Route path='/profile' element={<RequiresAuth>
        <Profile/>
      </RequiresAuth>}
      />
       <Route path='/userprofile' element={<RequiresAuth>
        <Profile/>
      </RequiresAuth>}
      />
      <Route path='/home' element={
        <RequiresAuth>
      <Home/>
      </RequiresAuth>
      } />
      <Route path="/explore" element={
        <RequiresAuth><Explore/></RequiresAuth>
      } />
      <Route path="/bookmarks" element={
        <RequiresAuth><Explore/></RequiresAuth>
      } />
       <Route path="/post" element={
        <RequiresAuth><IndividualPost/></RequiresAuth>
      } />
      </Routes>
      
    </div>
  );
}

export default App;
