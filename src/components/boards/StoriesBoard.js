import React, { useState } from 'react'
import Pagination from '../layout/Pagination'
import Story from './Story'

const StoriesBoard = ({ stories, storiesPerPage, totalStories }) => {
  const [page, setPage] = useState(1)
  const [fromResult, setFromResult] = useState(1)
  const [toResult, setToResult] = useState(
    Math.min(storiesPerPage, totalStories)
  )

  // Getting current page stories
  const indexOfLastStory = page * storiesPerPage
  const indexOfFirstStory = indexOfLastStory - storiesPerPage
  const currentPageStories = stories.slice(indexOfFirstStory, indexOfLastStory)

  // Changing page by number
  const paginate = (pageNumber) => {
    const lastPage = pageNumber * storiesPerPage
    setFromResult(lastPage - storiesPerPage + 1)
    setToResult(lastPage)
    setPage(pageNumber)
  }

  // Changing page by previous btn
  const paginatePrev = () => {
    const pageNumber = page - 1 >= 1 ? page - 1 : 1
    const lastPage = pageNumber * storiesPerPage
    setFromResult(lastPage - storiesPerPage + 1)
    setToResult(lastPage)
    setPage(pageNumber)
  }

  // Changing page by next btn
  const paginateNext = () => {
    const maxPages = Math.ceil(totalStories / storiesPerPage)
    const pageNumber = page + 1 <= maxPages ? page + 1 : maxPages
    const lastPage = pageNumber * storiesPerPage
    setFromResult(lastPage - storiesPerPage + 1)
    setToResult(pageNumber * storiesPerPage)
    setPage(pageNumber)
  }

  return (
    <div>
      {totalStories === 0 ? (
        <h1
          style={{
            width: '200px',
            margin: 'auto',
            marginTop: '50px',
            display: 'block',
          }}
        >
          No Stories Found!
        </h1>
      ) : (
        <div className='stories'>
          {currentPageStories.map((story, index) => {
            return <Story key={index} story={story} />
          })}
          <Pagination
            storiesPerPage={storiesPerPage}
            totalStories={stories.length}
            fromResult={fromResult}
            toResult={toResult}
            paginate={paginate}
            paginatePrev={paginatePrev}
            paginateNext={paginateNext}
          />
        </div>
      )}
    </div>
  )
}

export default StoriesBoard
