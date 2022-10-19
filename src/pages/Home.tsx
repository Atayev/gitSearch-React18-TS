import React, { useEffect,useState } from 'react'
import RepoCart from '../components/RepoCart'
import { useDebounce } from '../hooks/debounce'
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api'

function Home() {
  const [search, setSearch] = useState('')
  const [dropDown, setDropdown] = useState(false)
  const debounced = useDebounce(search)
  const [fetchRepos, {isLoading:areRepoLoad, data:repos}] = useLazyGetUserReposQuery()
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus:true
  })
  
  useEffect(() => {
    setDropdown(debounced.length >3 && data?.length! >0)
  },[debounced,data])

  const clickHandler= (userName:string) => {
    fetchRepos(userName)
    setDropdown(false)
  }
  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && <p className='text-center text-red-600'>Something went wrong</p>}

      <div className='relative w-[560px]'>
        <input
          type="text"
          value={search}
          className='border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='Search for Github username...'
          onChange={e=>setSearch(e.target.value)}
        />
        { dropDown && <ul className='list-none absolute top-[42px] overflow-y-scroll left-0 right-0 max-h-[200px] shadow-md bg-white'>
          {isLoading && <p className='text-center'>Loading ...</p>}
          {data?.map((user) => (
            <li
              onClick={()=>clickHandler(user.login)}
              key={user.id}
             className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
            >
              {user.login}</li>
          ))}

        </ul>}
      </div>
      <div className="container">
        {areRepoLoad && <p className='text-center'>Repos are loading ...</p>}
        {repos?.map((repo) => (
          <RepoCart
            repo={repo}
            key={repo.id}
          
          />
        ))}
      </div>
    </div>
  )
}

export default Home