import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'


const Card = ({data, trending, index, media_type}) => {
    
    const imgUrl = useSelector(state => state.movioData.imgURL)
    const mediaType = data.media_type ?? media_type;
  return (
    <Link to={'/' + mediaType + '/' + data.id} className='w-full min-w-[280px] max-w-[280px] h-80 rounded overflow-hidden block relative hover:scale-105 transition-all'>
      {
        data?.poster_path ? (
          <img
            src={imgUrl+data?.poster_path}
          />
        ) : (
          <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>No Image Found</div>
        )
      }
      <div className='absolute top-0'>
        {
            trending && (
                <div className='rounded-r-full px-4 py-1 backdrop-blur-2xl bg-black/60 overflow-hidden'>
                    #{index} Trending
                </div>
            )
        }
      </div>
      <div className='absolute bottom-0 w-full backdrop-blur-3xl h-16 p-2'>
        <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>
        {data?.title || data?.name}
        </h2>
        <div className='text-sm flex justify-between items-center'>
            <p> {moment(data.release_date).format('MMMM Do YYYY')} </p>
            <p className='rounded-full bg-black px-1 text-white'>Rating:  {Number(data.vote_average).toFixed(1)} </p>
        </div>
      </div>
    </Link>
  )
}

export default Card
