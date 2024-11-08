import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux'

const BannerHome = () => {
    const bannerData = useSelector(state => state.movioData.bannerData);
    const imgUrl = useSelector(state => state.movioData.imgURL);
    const [currentImage, setCurrentImage] = useState(1);

    const handlePrevious = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1)
        }
    }
    
    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(prev => prev + 1)
        }
    }

    useEffect(() => {
       const interval = setInterval(() => {
        if (currentImage < bannerData.length - 1) {
            handleNext();
        }else {
            setCurrentImage(1)
        }
       }, 8000);

       return () => clearInterval(interval)
    }, [bannerData, imgUrl,currentImage])
    
  return (
    <section className='w-full h-full'>
        <div className='flex min-h-full max-h-[95vh] overflow-hidden group'>
            {bannerData.map((data) => {
                return(
                    <div key={data.id} className='min-h-[490px] min-w-full lg:min-h-full overflow-hidden relative group transform-all'
                        style={{transform: `translateX(-${currentImage * 100}%)`}}>
                        <div>
                            <img
                                src={imgUrl+data.backdrop_path}
                                className='h-full w-full object-cover'
                            />
                        </div>
                        <div className='h-full w-full absolute top-0 hidden items-center justify-between px-4 group-hover:flex'>
                            <button onClick={handlePrevious} className='bg-white text-xl rounded-full z-10 text-black p-1'>
                                <FaAngleLeft />
                            </button>
                            <button onClick={handleNext} className='bg-white text-xl rounded-full z-10 text-black p-1'>
                                <FaAngleRight/>
                            </button>
                        </div>
                        <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
                        <div className='container mx-auto'>
                            <div className='w-full absolute bottom-0 max-w-md px-3'>
                                <h2 className='text-2xl font-bold lg:text-4xl text-white drop-shadow-2xl'>
                                    {data?.title || data?.name}
                                </h2>
                                <p className='text-ellipsis line-clamp-3 my-2'> {data.overview} </p>
                                <div className='flex items-center gap-4'>
                                    <p> Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                    <span>|</span>
                                    <p>Views: {Number(data.popularity).toFixed(0)}</p>
                                </div>
                                <button className='bg-white text-black px-3 py-2 font-bold rounded my-3 hover:bg-gradient-to-t from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                    Play Now
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default BannerHome
