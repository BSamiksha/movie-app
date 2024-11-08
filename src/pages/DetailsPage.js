import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useFetchDetails from '../hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import HorizontailScrollCard from '../components/HorizontalScrollCard'

const DetailsPage = () => {
  const params = useParams()

  const {data} = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const {data:credits} = useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const imgUrl = useSelector(state => state.movioData.imgURL)
  const duration = (Number(data?.runtime)/60).toFixed(1).split('.')
  const {data: similarData} = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const {data: recommendedData} = useFetch(`/${params?.explore}/${params?.id}/recommendations`)


  console.log('daya....',data);
  
  return (
    <div>
      <div className='w-full h-[280px] relative  hidden lg:block'>
        <div className='w-full h-full '>
          <img
            src={imgUrl + data?.backdrop_path}
            className='h-full object-cover w-full'
          />
        </div>
        <div className='absolute bg-gradient-to-t from-neutral-900/90 to-transparent w-full h-full top-0'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='relative lg:-mt-28 mx-auto lg:mx-0 w-fit min-w-60'>
          <img
            src={imgUrl + data?.poster_path}
            className='h-80 object-cover w-60 rounded'
          />
        </div>
        <div>
          <h2 className='text-2xl lg:text-4xl font-bold text-white lg:'>{data?.title || data?.name}</h2>
          <p className='text-neutral-400'> {data?.tagline} </p>

          <Divider />

          <div className='flex items-center gap-4'>
            <p>
              Rating: {Number(data?.vote_average).toFixed(1)}
            </p>
            <span>|</span>
            <p>
              Views: {Number(data?.vote_count)}
            </p>
            <span>|</span>
            <p>
              Duration: {duration[0]}hr. {duration[1]}min
            </p>
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview:</h3>
            <p>{data?.overview}</p>

            <Divider />
            <div className='flex items-center gap-4 my-3 text-center'>
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>Released Date: {moment(data?.release_date).format('MMMM do YYYY')}</p>
              <span>|</span>
              <p>Revenue: {data?.revenue}</p>
            </div>

            <Divider />
          </div>
          
          <div>
            <p>
              <span className='text-white'>Director: </span>
              {credits?.crew[0]?.name}
            </p>
            <Divider />
            <p>
              <span className='text-white'>Writer: </span>
              {credits?.crew?.filter(element => element?.job === 'Writer')?.map(el => el?.name)}
            </p>
          </div>

          <Divider />

          <h2 className='text-lg font-bold text-white'> Casts:</h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-9'>
            {
              credits?.cast.filter(element => element.profile_path).map(cast => {
                return(
                  <div>
                    <div>
                      <img
                        src={imgUrl+cast?.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>
                    <p className='font-bold text-center text-sm'>{cast?.name}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <div>
        <HorizontailScrollCard trendingData={similarData} heading={`Similar ${params?.explore}`} media_type={params?.explore} />
        <HorizontailScrollCard trendingData={recommendedData} heading={`Recommended ${params?.explore}`} media_type={params?.explore} />
      
      </div>

    </div>
  )
}

export default DetailsPage
