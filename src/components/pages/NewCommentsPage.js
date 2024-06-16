import React, { useState, useEffect } from 'react'
import CommentsBoard from '../boards/CommentsBoard'
import Spinner from '../layout/Spinner'

const NewCommentsPage = () => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  const commentsPerPage = 10
  const totalComments = 100

  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=comment&hitsPerPage=${totalComments}`

  const fetchComments = async () => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    const latestComments = data.hits
    setComments(latestComments)    
    setLoading(false)
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div>
      <div className='overflow-hidden bg-white '>
        <div className='px-4 py-5 sm:px-6 flex'>
          <h3 className='text-lg font-medium leading-6 text-gray-900 mr-2'>
            Newest Comments
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
              d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
            />
          </svg>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <CommentsBoard
          comments={comments}
          commentsPerPage={commentsPerPage}
          totalComments={totalComments}
        />
      )}
    </div>
  )
}

export default NewCommentsPage
