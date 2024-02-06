import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Post from './Pages/Post/Post'

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/:slug" element={<Post />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
