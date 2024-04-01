import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

    <Header/>
    
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/sign-in' element={ <SignIn /> } />
        <Route path='/sign-up' element={ <SignUp /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/projects' element={ <Projects /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
