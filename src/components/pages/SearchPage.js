import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import StoriesBoard from '../boards/StoriesBoard'
import CommentsBoard from '../boards/CommentsBoard'
import Spinner from '../layout/Spinner'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SearchPage = () => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('Story')
  const [byFilter, setByFilter] = useState('Date')
  const [timeFilter, setTimeFilter] = useState('All Time')
  const [searchResult, setSearchResult] = useState([])
  const [totalResults, setTotalResults] = useState(100)
  const [resultsPerPage] = useState(10)

  const fetchResults = async () => {
    setLoading(true)
    const tag = typeFilter.toLowerCase()
    var url = `https://hn.algolia.com/api/v1/search_by_date?tags=${tag}&hitsPerPage=${totalResults}`

    if (timeFilter === 'All Time') {
      url = `https://hn.algolia.com/api/v1/search_by_date?query=${search}&tags=${tag}&hitsPerPage=${totalResults}`
    } else {
      var x = 0
      var y = Math.floor(Date.now() / 1000)

      if (timeFilter === 'Last 24h') x = y - 86400
      else if (timeFilter === 'Past Week') x = y - 604800
      else if (timeFilter === 'Past Month') x = y - 2678400
      url = `https://hn.algolia.com/api/v1/search_by_date?query=${search}&tags=${tag}&numericFilters=created_at_i>${x},created_at_i<${y}&hitsPerPage=100`
    }
    const response = await fetch(url)
    const data = await response.json()
    const result = data.hits

    if (byFilter === 'Date') {
      setSearchResult(result)
    } 
    else 
    if (byFilter === 'Popularity') {
      var popResult = result
      popResult = popResult.sort((a, b) => {
        return b.points - a.points
      })
      setSearchResult(popResult)
    }

    // console.log(result);
    setTotalResults(result.length)
    setLoading(false)
  }

  useEffect(() => {
    fetchResults()
  }, [typeFilter, byFilter, timeFilter])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchResults()
  }

  return (
    <div>
      <div className='search-nav flex justify-around m-5'>
        {/* Search input  */}
        <div className='search-bar grow mx-3'>
          <div className='relative rounded-md shadow-sm '>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <span className='text-gray-500 sm:text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </span>
            </div>
            <input
              type='text'
              name='searchstory'
              id='searchstory'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='block w-full rounded-md border-gray-300 pl-10 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              placeholder='Search stories by title, url or author, e.g. "nexus"'
            />
          </div>
        </div>

        {/* Filters */}

        {/* type filter */}
        <div className='type-filter mx-3'>
          <span className='mr-2'>Type</span>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                {typeFilter}
                <ChevronDownIcon
                  className='-mr-1 ml-2 h-5 w-5'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick={() => {
                          setTypeFilter('Story')
                        }}
                      >
                        Story
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick={() => {
                          setTypeFilter('Comment')
                        }}
                      >
                        Comment
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* by filter */}
        <div className='by-filter mx-3'>
          <span className='mr-2'>by</span>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                {byFilter}
                <ChevronDownIcon
                  className='-mr-1 ml-2 h-5 w-5'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick={() => {
                          setByFilter('Popularity')
                        }}
                      >
                        Popularity
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick={() => {
                          setByFilter('Date')
                        }}
                      >
                        Date
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* time filter */}
        <div className='time-filter mx-3'>
          <span className='mr-2'>for</span>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                {timeFilter}
                <ChevronDownIcon
                  className='-mr-1 ml-2 h-5 w-5'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick={() => {
                          setTimeFilter('All Time')
                        }}
                      >
                        All Time
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick={() => {
                          setTimeFilter('Last 24h')
                        }}
                      >
                        Last 24h
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick={() => {
                          setTimeFilter('Past Week')
                        }}
                      >
                        Past Week
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick={() => {
                          setTimeFilter('Past Month')
                        }}
                      >
                        Past Month
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* Search Button */}
        <div className='search-button mx-3'>
          <button
            type='submit'
            onClick={handleSubmit}
            className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Search
          </button>
        </div>
      </div>

      {/* Stories or Comments board */}
      <div>
        {loading ? (
          <Spinner />
        ) : typeFilter === 'Story' ? (
          <StoriesBoard
            stories={searchResult}
            storiesPerPage={resultsPerPage}
            totalStories={totalResults}
          />
        ) : (
          <CommentsBoard
            comments={searchResult}
            commentsPerPage={resultsPerPage}
            totalComments={totalResults}
          />
        )}
      </div>
    </div>
  )
}

export default SearchPage
