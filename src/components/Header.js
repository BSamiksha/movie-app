import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import userIcon from '../assets/user.png';
import { AiOutlineSearch } from 'react-icons/ai';
import { navigation } from '../constants/navigation';


const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split('%20')?.join(' ')
  const [searchInput, setSearchInput] = useState(removeSpace);
  // useNavigation hook is used to perform the navigation actions
  const navigate = useNavigate();

  useEffect(() => {
    if(searchInput) {
      navigate(`/search?q=${searchInput}`)
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='fixed pt-0 h-16 w-full bg-neutral-600 bg-opacity-50 z-40'>
      <div className='container mx-auto px-3 flex items-center h-full'>
        <Link to='/'>
          <img src={logo} alt='logo' width={120}/>
        </Link>

        <nav className='hidden lg:flex items-center gap-2 ml-5'>
          {navigation.map((nav, index) => {
            return (
              <div>
                <NavLink key={nav.label} to={nav.href} className={({isActive})=> `px-3 hover:text-neutral-100 ${isActive && "text-neutral-100"}`}>
                  {nav.label}
                </NavLink>
              </div>
            )
          })}
        </nav>

        <div className='ml-auto mr-5 flex items-center gap-5'>
          <form className='flex' onSubmit={handleSubmit}>
            <input
            type='text'
            placeholder='Search here...'
            className='bg-transparent px-4 py-1 border-none outline-none hidden lg:block'
            onChange={(e)=>setSearchInput(e.target.value)}
            value={searchInput}
            />

            <button  className='text-2xl text-white'>
              <AiOutlineSearch />
            </button>
          </form>
          <div className='cursor-pointer w-8 h-8 rounded-full overflow-hidden active:scale-50 transition-all'>
            <img src={userIcon} alt='user icon' className='w-full h-full' />

          </div>
        </div>

      </div>
    </div>
  )
}

export default Header
