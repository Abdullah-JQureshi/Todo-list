import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-500 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>AJ</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='hover:bg-yellow-600 cursor-pointer rounded transition-all hover:font-bold'>Home</li>
        <li className='hover:bg-yellow-600 cursor-pointer rounded transition-all hover:font-bold'>My tasks</li>
        <li className='hover:bg-yellow-600 cursor-pointer rounded transition-all hover:font-bold'>Completed</li>
        <li className='hover:bg-yellow-600 cursor-pointer rounded transition-all hover:font-bold'>Pending</li>
      </ul>
    </nav>
  )
}

export default Navbar
