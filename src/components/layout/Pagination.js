import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const Pagination = ({
  storiesPerPage,
  totalStories,
  toResult,
  fromResult,
  paginate,
  paginatePrev,
  paginateNext,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalStories / storiesPerPage); i++) {
    pageNumbers.push(i)
  }

  const changeActiveButtonStyle = (index) => {
    const activePag = document.getElementById(`pagination${index}`)
    activePag.setAttribute(
      'style',
      'background-color: rgba(212, 207, 207, 0.624); color:rgb(139,92,246);'
    )
    pageNumbers.map((i) => {
      if (i !== index) {
        document
          .getElementById(`pagination${i}`)
          .setAttribute('style', 'background-color: white; color:rgb(107,114,128)')
      }
    })
  }

  const handleClick = (index, number) => {
    setCurrentIndex(index)
    changeActiveButtonStyle(index)
    paginate(number)
  }

  const handlePrevClick = () => {
    const index = currentIndex - 1 >= 0 ? currentIndex - 1 : 0
    setCurrentIndex(index)
    changeActiveButtonStyle(index)
    paginatePrev()
  }

  const handleNextClick = () => {
    const maxPages = Math.ceil(totalStories / storiesPerPage)
    const index = currentIndex + 1 < maxPages ? currentIndex + 1 : maxPages
    setCurrentIndex(index)
    changeActiveButtonStyle(index)
    paginateNext()
  }

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
      <div className='sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <p className='text-sm text-gray-700 mb-2'>
          Showing <span className='font-medium'>{fromResult}</span> to{' '}
          <span className='font-medium'>{toResult}</span> of{' '}
          <span className='font-medium'>{totalStories}</span> results
        </p>
        <div id='pages'>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <a
              onClick={handlePrevClick}
              className='relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </a>

            {pageNumbers.map((number, index) => (
              <a
                id={`pagination${index}`}
                key={index}
                onClick={() => handleClick(index, number)}
                className='relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
              >
                <span className={'paginationLinkStyle'}>{number}</span>
              </a>
            ))}

            <a
              onClick={handleNextClick}
              className='relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
