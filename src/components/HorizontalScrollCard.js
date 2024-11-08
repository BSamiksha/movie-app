import React, { useRef } from 'react'
import Card from './Card'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';


const HorizontalScrollCard = ({trendingData = [], heading,trending, media_type}) => {
    const containerRef = useRef()
    const handleNext = () => {
        containerRef.current.scrollLeft += 300
    }
    const handlePrevious = () => {
        containerRef.current.scrollLeft -= 300
    }
  return (
    <div className='container mx-auto my-8 px-5'>
        <h2 className='font-bold text-xl lg:text-2xl mb-2 capitalize'>{heading}</h2>
        <div className='relative'>
            <div ref={containerRef} className='grid gap-6 grid-cols-[repeat(auto-fit,280px)] scrollbar-none grid-flow-col overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all'>
                {
                trendingData.map((data, index) => {
                    return(
                    <Card key={data.id} data={data} trending={trending} index={index +1} media_type={media_type} />
                    )
                })
                } 
            </div>
            <div className='absolute top-0 lg:flex hidden justify-between w-full items-center h-full'>
                <button onClick={handlePrevious} className='bg-white text-black rounded-full p-1 -ml-2 z-10'>
                    <FaAngleLeft />
                </button>
                <button onClick={handleNext} className='bg-white text-black rounded-full p-1 -mr-2 z-10'>
                    <FaAngleRight />
                </button>
            </div>
        </div>
    </div>
  )
}

export default HorizontalScrollCard
