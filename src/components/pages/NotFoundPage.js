import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='bg-white py-24 sm:py-32 lg:py-40'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='sm:text-center'>
          <h2 className='text-xl font-semibold leading-8 text-indigo-600'>
            404
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Page not Found.
          </p>
          <p className='mx-auto mt-3 max-w-2xl text-base leading-8 text-gray-600'>
            Sorry, we couldn't find the page you are looking for.
          </p>
        </div>

        <div className='search-button mx-3'>
          <button
            style={{
              margin: 'auto',
              marginTop: '40px',
              display: 'block',
            }}
            className='group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <a href='/'>Go back home</a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
