import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Post from './Pages/Post/Post'
import NotFound from './Pages/NotFound/NotFound'
import Footer from './Components/Footer/Footer'
import LogIn from './Pages/LogIn/LogIn'
import NewPost from './Pages/NewPost/NewPost'

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/:slug" element={<Post />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/new-post" element={<NewPost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
