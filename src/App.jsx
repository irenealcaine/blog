import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Post from './Pages/Post/Post'
import NotFound from './Pages/NotFound/NotFound'
import Footer from './Components/Footer/Footer'
import LogIn from './Pages/LogIn/LogIn'
import NewPost from './Pages/NewPost/NewPost'
import EditPost from './Pages/EditPost/EditPost'
import ProtectedRoute from './Components/ProtectedRoute'
import { AuthContextProvider } from './Context/AuthContext'

function App() {

  return (
    <div className="app">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/:slug" element={<Post />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/new-post" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
            <Route path="/edit-post/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  )
}

export default App
