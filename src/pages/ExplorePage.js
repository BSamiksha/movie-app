import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0)

  const fetchData = async () => {
    try {
      const res = await axios.get(`/discover/${params.explore}`, {
        params: {
          page : pageNo
        }
      });
      setData((prev) => {
        return[
          ...prev,
          ...res.data.results
        ]
      })
      setTotalPages(res.data.total_pages);
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
    fetchData();
  }, [pageNo, params.explore])

  useEffect(() => {
    setPageNo(1)
    setData([]);
    fetchData();
  }, [params.explore])

  useEffect(() => {
   window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='py-16 pl-2'>
      <div className='container mx-auto'>
        <h2 className='capitalize text-lg lg:text-xl font-semibold my-3 '>Popular {params.explore}</h2>
        <div className='grid gap-6 grid-cols-[repeat(auto-fit,280px)]'>
          {data.map((exploreData, index) => {
            return (
              <Card data = {exploreData} key={exploreData.id+'explore'+index} media_type={params.explore} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
