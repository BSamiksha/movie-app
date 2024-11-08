import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-600 text-neutral-400 py-1'>
      <div className='flex items-center justify-center gap-3'>
        <Link to='/'> Contact</Link>
        <Link> About</Link>
      </div>
      <p className='text-sm'>Created by Samiksha</p>
    </footer>
  )
}

export default Footer
