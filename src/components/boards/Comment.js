import React from 'react'
import getTimeDiffAndPrettyText from '../../Utilities.js'
import { Link } from 'react-router-dom'

const Comment = ({
  author,
  time,
  storyTitle,
  storyId,
  commentText,
  hideStoryTitle
}) => {
  const timeDiff = getTimeDiffAndPrettyText(time) 
  return (
    <div>
      <div className='singlecomment border-t border-gray-300 overflow-hidden'>
        <dl>
          <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0'>
              <div className='mb-2 flex'>
                {/* author name */}
                <div className='comment-author flex mr-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='grey'
                    className='w-4 h-4 mr-0.5 mt-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                    />
                  </svg>
                  <span className='text-gray-500'>{author} </span>
                </div>

                {/* time */}
                <div className='comment-time flex mr-4'>
                  {' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='grey'
                    className='w-4 h-4 mx-0.5 mt-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span className='text-gray-500'>
                    {' '}
                    {timeDiff.friendlyNiceText.toLowerCase()}
                  </span>
                </div>

                {/* story of comment */}
                <div className={hideStoryTitle ? 'comment-story flex hidden': 'comment-story flex'} >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='grey'
                    className='w-4 h-4 mx-1 mt-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                    />
                  </svg>
                  <span className='text-gray-500'>
                    {' on: '}
                    <Link
                      className='comment-story-text'
                      to={`/story/${storyId}`}
                    >
                      {storyTitle}
                    </Link>
                  </span>
                </div>
              </div>

              <div
                className='comment-body text-base text-gray-900'
                dangerouslySetInnerHTML={{ __html: commentText }}
              ></div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default Comment
