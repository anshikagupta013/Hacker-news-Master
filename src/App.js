import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import SearchPage from './components/pages/SearchPage'
import NewStoriesPage from './components/pages/NewStoriesPage'
import NewCommentsPage from './components/pages/NewCommentsPage'
import FrontPage from './components/pages/FrontPage'
import StoryPage from './components/pages/StoryPage'
import NotFoundPage from './components/pages/NotFoundPage'

function App() {
  return (
    <Router>
      <main className='App'>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<FrontPage />} />
            <Route path='/newstories' element={<NewStoriesPage />} />
            <Route path='/newcomments' element={<NewCommentsPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/story/:id' element={<StoryPage />} />
            <Route path='*' element={ <NotFoundPage /> } />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App
