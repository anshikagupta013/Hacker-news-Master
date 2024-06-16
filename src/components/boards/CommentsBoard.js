import React, { useState } from 'react'
import Pagination from '../layout/Pagination'
import Comment from './Comment'

const CommentsBoard = ({
  comments,
  commentsPerPage,
  totalComments,
  hideStoryTitle = false,
}) => {
  const [page, setPage] = useState(1)
  const [fromResult, setFromResult] = useState(1)
  const [toResult, setToResult] = useState(
    Math.min(commentsPerPage, totalComments)
  )
  const maxPages = Math.ceil(totalComments / commentsPerPage) //4

  // Getting current page comments
  const indexOfLastComment = page * commentsPerPage
  const indexOfFirstComment = indexOfLastComment - commentsPerPage
  const currentPageComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  )

  // Changing page by number
  const paginate = (pageNumber) => {
    const lastPage = pageNumber * commentsPerPage
    setFromResult(lastPage - commentsPerPage + 1)
    if (pageNumber === maxPages) {
      setToResult(Math.min(totalComments, maxPages * commentsPerPage))
    } else {
      setToResult(lastPage)
    }
    setPage(pageNumber)
  }

  // Changing page by previous btn
  const paginatePrev = () => {
    const pageNumber = page - 1 >= 1 ? page - 1 : 1
    const lastPage = pageNumber * commentsPerPage
    setFromResult(lastPage - commentsPerPage + 1)
    setToResult(lastPage)
    setPage(pageNumber)
  }

  // Changing page by next btn
  const paginateNext = () => {
    const pageNumber = page + 1 <= maxPages ? page + 1 : maxPages
    const lastPage = pageNumber * commentsPerPage
    setFromResult(lastPage - commentsPerPage + 1)
    if (pageNumber === maxPages) {
      setToResult(Math.min(totalComments, maxPages * commentsPerPage))
    } else {
      setToResult(lastPage)
    }
    setPage(pageNumber)
  }

  return (
    <div>
      {totalComments === 0 ? (
        <h1
          style={{
            width: '200px',
            margin: 'auto',
            marginTop: '50px',
            display: 'block',
          }}
        >
          No Comments Found!
        </h1>
      ) : (
        <div>
          {currentPageComments.map((comment, index) => {
            return (
              <Comment
                key={index}
                author={comment.author}
                time={comment.created_at}
                storyTitle={comment.story_title}
                storyId={comment.story_id}
                commentText={comment.comment_text}
                hideStoryTitle={hideStoryTitle}
              />
            )
          })}

          <Pagination
            storiesPerPage={commentsPerPage}
            totalStories={comments.length}
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

export default CommentsBoard
