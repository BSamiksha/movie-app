import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import axios from 'axios'
import useFetch from '../hooks/useFetch'

const Home = () => {
  const trendingData = useSelector(state => state.movioData.bannerData)
  const {data : nowPlaying} = useFetch('/movie/now_playing')
  const {data : topRatedMovies} = useFetch('/movie/top_rated')
  const {data : popularTvShow} = useFetch('/tv/popular')
  const {data : onTheAirShow} = useFetch('/tv/on_the_air')

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard trendingData={trendingData} heading={"Trending"} trending={'true'} />
      <HorizontalScrollCard trendingData={nowPlaying} heading={"Now Playing"} media_type={'movie'} />
      <HorizontalScrollCard trendingData={topRatedMovies} heading={"Top Rated Movies"} media_type={'movie'} />
      <HorizontalScrollCard trendingData={popularTvShow} heading={"Popular TV Shows"} media_type={'tv'} />
      <HorizontalScrollCard trendingData={onTheAirShow} heading={"On The Air"} media_type={'tv'} />
    </div>
  )
}

export default Home
