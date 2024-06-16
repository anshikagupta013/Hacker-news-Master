import React, { useEffect, useState } from 'react'
import StoriesBoard from '../boards/StoriesBoard'
import Spinner from '../layout/Spinner'

const FrontPage = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(false)

  const storiesPerPage = 20
  const totalStories = 200
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=points>100&hitsPerPage=100`

  const fetchStories = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      const latestStories = data.hits
      setStories(latestStories)
      // console.log(stories)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <div>
      <div className='px-4 py-5 sm:px-6 flex'>
        <h3 className='text-lg font-medium leading-6 text-gray-900 mr-2'>
          Trending Stories
        </h3>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
          />
        </svg>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <StoriesBoard
          stories={stories}
          storiesPerPage={storiesPerPage}
          totalStories={totalStories}
        />
      )}
    </div>
  )
}

export default FrontPage
