import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommentsBoard from '../boards/CommentsBoard'
import Spinner from '../layout/Spinner'
import getTimeDiffAndPrettyText from '../../Utilities.js'

const StoryPage = () => {
  const [story, setStory] = useState({})
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  const storyId = useParams().id
  const storyUrl = `https://hn.algolia.com/api/v1/search?tags=story,story_${storyId}`
  const commentsUrl = `https://hn.algolia.com/api/v1/search?tags=comment,story_${storyId}&hitsPerPage=300`

  const fetchResults = async () => {
    setLoading(true)

    const response = await fetch(storyUrl)
    const data = await response.json()
    const result = data.hits
    const storyJson = result[0]
    setStory(storyJson)

    const response2 = await fetch(commentsUrl)
    const data2 = await response2.json()
    const result2 = data2.hits
    setComments(result2)

    setLoading(false)
  }

  useEffect(() => {
    fetchResults()
  }, [])

  return (
    <div>
      {loading === true ? (
        <Spinner />
      ) : (
        <div>
          <div className='overflow-hidden py-2 bg-white shadow'>
            <div className='px-4 pt-5 sm:px-6'>
              <h2 className='text-xl font-medium leading-6 text-gray-900'>
                {story.title}
              </h2>
              <p
                className='mt-1 text-sm text-gray-500'
                dangerouslySetInnerHTML={{ __html: story.story_text }}
              ></p>
            </div>

            <div className=' px-5 pb-2 pt-4 sm:grid sm:grid-cols-5 sm:gap-2 sm:px-6'>
              {/* points */}
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0 flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='rgb(139,92,246)'
                  className='w-4 h-4 text-gray-900 mr-2 mt-0.5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
                  />
                </svg>
                <span className='text-sm text-gray-700'>
                  {story.points}{' '}
                  {story.points === 1 ? (
                    <span>point</span>
                  ) : (
                    <span>points </span>
                  )}
                </span>
              </dd>

              {/* attached link */}
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0 flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='rgb(139,92,246)'
                  className='w-4 h-4 text-gray-900 mr-2 mt-0.5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
                  />
                </svg>
                {story.url ? (
                  <span
                    className='story-source text-sm text-gray-700'
                    style={{ color: 'rgb(139,92,246)' }}
                  >
                    <a href={story.url} target='_blank' rel='noreferrer'>
                      attached link
                    </a>
                  </span>
                ) : (
                  <></>
                )}
              </dd>

              {/* comments */}
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0 flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='rgb(139,92,246)'
                  className='w-4 h-4 text-gray-900 mr-2 mt-0.5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
                  />
                </svg>
                <span className='text-sm text-gray-700'>
                  {story.num_comments}{' '}
                  {story.num_comments <= 1 ? (
                    <span>comment</span>
                  ) : (
                    <span>comments</span>
                  )}
                </span>
              </dd>

              {/* time */}
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0 flex '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='rgb(139,92,246)'
                  className='w-4 h-4 mr-2 mt-0.5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span className='text-sm text-gray-700'>
                  {getTimeDiffAndPrettyText(
                    story.created_at
                  ).friendlyNiceText.toLowerCase()}
                </span>
              </dd>

              {/* user */}
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0 flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='rgb(139,92,246)'
                  className='w-4 h-4 mr-2 mt-0.5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                  />
                </svg>
                <span className='text-sm text-gray-700'> {story.author}</span>
              </dd>
            </div>
          </div>

          {/* Commments of story */}
          <CommentsBoard
            comments={comments}
            commentsPerPage={20}
            totalComments={comments.length}
            hideStoryTitle={true}
          />
        </div>
      )}
    </div>
  )
}

export default StoryPage
