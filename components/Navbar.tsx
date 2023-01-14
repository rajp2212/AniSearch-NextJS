import { useState, useEffect } from 'react'



const Navbar = () => {

  let dateNow = new Date().toDateString();


  return (
    <>
      <div className="navMain">

        <h2>AniSearch</h2>

        <div className="navInputDiv">
          <input className='navInput' type="text" />
          <button className='navSearchBtn'>icon</button>
        </div>
        <h3>{dateNow.slice(4, 10)}th</h3>

      </div>

    </>
  )
}

export default Navbar