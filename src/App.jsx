import React from 'react'

import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Hero from './Components/Hero'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Dashboard from './Components/Dashboard'
import Post from './Components/Post'
import Sign from './Components/Sign'
import Blog from './Components/Blog'
import UpdatePost from './Components/UpdatePost'
const App = () => {
  return (
    <div>
<BrowserRouter>
<Header/>
<Routes>
  <Route path='/' element={<Hero/>}></Route>
  <Route path='/dashboard' element={<Dashboard/>}></Route>
  <Route path='/post' element={<Post/>}></Route>
  <Route path='/blog' element={<Blog/>}></Route>
  <Route path='/sign' element={<Sign/>}></Route>
  <Route path='/sign' element={<Sign/>}></Route>
  <Route path='/update/:id' element={<UpdatePost/>}></Route>
</Routes>
<Footer/>
</BrowserRouter>


    </div>
  )
}

export default App