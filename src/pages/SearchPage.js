import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const navigate = useNavigate();
  const query = location?.search?.slice(3);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page : pageNo
        }
      });
      setData((prev) => {
        return[
          ...prev,
          ...res.data.results
        ]
      })
    } catch (error) {
      console.log("error",error)
    }
  }

  const handleScroll = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  },[])

  useEffect(() => {
    setPageNo(1);
    setData([])
    fetchData();
  },[location.search])

  useEffect(() => {
    fetchData();
  }, [pageNo])
  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-16 z-30'>
        <input type='text'
          placeholder='Search here...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
          value={query?.split('%20')?.join(' ')}
        />
      </div>
      <div className='container mx-auto pl-2'>
        <h2 className='capitalize text-lg lg:text-xl font-semibold my-3 '>Search Results</h2>
        <div className='grid gap-6 grid-cols-[repeat(auto-fit,280px)]'>
          {data.map((searchData, index) => {
            return (
              <Card data = {searchData} key={searchData.id+'search'+index} media_type={searchData.media_type}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
