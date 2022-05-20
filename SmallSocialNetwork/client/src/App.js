import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profileforms/CreateProfile'
import AddExperience from './components/profileforms/AddExperience'
import AddEducation from './components/profileforms/AddEducation'
import PrivateRoute from './components/routing/PrivateRoute'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import NotFound from './components/layout/NotFound'
import './App.css';
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'



const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    } else {
      setAuthToken(localStorage.token)
    }
    dispatch(loadUser())
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <Alert />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/profiles' element={<Profiles />} />
        <Route exact path='/profile/:id' element={<Profile />} />

        {/* <Route exact path='/dashboard' element={
          <PrivateRoute isAllowed={(!isAuthenticated && !loading)}>
            <Dashboard />
          </PrivateRoute>}
        />
        <Route exact path='/create-profile' element={
          <PrivateRoute isAllowed={(!isAuthenticated && !loading)}>
            <CreateProfile />
          </PrivateRoute>}
        /> */}
        <Route
          exact path="/dashboard"
          element={<PrivateRoute element={Dashboard} />}
        />
        <Route
          exact path="/create-profile"
          element={<PrivateRoute element={CreateProfile} />}
        />
        <Route
          exact path="/edit-profile"
          element={<PrivateRoute element={CreateProfile} />}
        />
        <Route
          exact path="/add-experience"
          element={<PrivateRoute element={AddExperience} />}
        />
        <Route
          exact path="/add-education"
          element={<PrivateRoute element={AddEducation} />}
        />
        <Route
          exact path="/posts"
          element={<PrivateRoute element={Posts}/>}
        />
        <Route
          exact path="/posts/:id"
          element={<PrivateRoute element={Post}/>}
        />
        <Route element={<NotFound />} />
      </Routes>
    </Router >
  )
}

export default App;