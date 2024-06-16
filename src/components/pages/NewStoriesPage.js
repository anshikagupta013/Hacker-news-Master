import React, { useEffect, useState } from 'react'
import StoriesBoard from '../boards/StoriesBoard'
import Spinner from '../layout/Spinner'

const NewStories = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(false)

  const storiesPerPage = 20
  const totalStories = 200
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=${totalStories}`

  const fetchStories = async () => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    const latestStories = data.hits
    setStories(latestStories)
    // console.log(stories)
    setLoading(false)
  }

  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <div>
      <div className='px-4 py-5 sm:px-6 flex'>
        <h3 className='text-lg font-medium leading-6 text-gray-900 mr-2'>
          Newest Stories
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
            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
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

export default NewStories
