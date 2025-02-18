const { useState, useEffect, useRef } = React
const { NavLink } = ReactRouterDOM

export function AppHeader(props) {

    const headerRef = useRef()

    useState(() => {
        document.addEventListener('scroll', onScrollBlurToHeader)
        return (() => {
            document.addEventListener('scroll', onScrollBlurToHeader)
        })
    })

    function onScrollBlurToHeader() {
        if (window.scrollY > 10) {
            headerRef.current.classList.add('scroll')
        } else {
            headerRef.current.classList.remove('scroll')
        }
    }

    return (

        <header ref={headerRef} className="app-header flex align-center justify-between">
            <h1 className='main-logo'> <NavLink to='/'> Miss Comics</NavLink></h1>
            <nav className='flex justify-between'>
                <NavLink to='/'> Home</NavLink>
                <NavLink to='/about-us'>About</NavLink>
                <NavLink to='/books'>Books</NavLink>
            </nav>
        </header>

    )
}