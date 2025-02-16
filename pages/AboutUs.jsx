const { useState, useEffect, useRef } = React
const { NavLink, Outlet } = ReactRouterDOM

export function AboutUs(props) {
  return (
    <section className='main-about'>

      <nav className='flex space-around'>
        <NavLink to='/about-us/about'>About</NavLink>
        <NavLink to='/about-us/contact-us'>Contact Us</NavLink>
        <NavLink to='/about-us/newsletter'>Newsletter</NavLink>
      </nav>

      <Outlet />

    </section>
  )
}