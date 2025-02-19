const { useState, useEffect, useRef } = React
const { NavLink } = ReactRouterDOM

export function AppHeader(props) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const headerRef = useRef()

    useState(() => {
        document.addEventListener('scroll', onScrollBlurToHeader)
        return (() => {
            document.addEventListener('scroll', onScrollBlurToHeader)
        })
    })

    function onScrollBlurToHeader() {
        if (window.scrollY > 1) {
            headerRef.current.classList.add('scroll')
        } else {
            headerRef.current.classList.remove('scroll')
        }
    }

    function onMenuBtn() {
        setIsMenuOpen(prev => prev = !isMenuOpen)
    }

    return (

        <header ref={headerRef} className="app-header flex align-center justify-between">
            <h1 className='main-logo'> <NavLink to='/'> Miss Comics</NavLink></h1>


            <input type="checkbox" id='menu' className='menu-input' onChange={onMenuBtn} />
            <label htmlFor="menu" className='menu-label'>
                <div className={`menu-btn ${isMenuOpen ? 'open' : 'close'}`}>
                    <span className={isMenuOpen ? 'fa close' : 'fa bar'}></span>
                </div>
            </label>

            <nav className={`flex ${isMenuOpen ? 'open' : 'close'}`} onClick={onMenuBtn}>
                <NavLink to='/'> Home</NavLink>
                <NavLink to='/about-us'>About</NavLink>
                <NavLink to='/books'>Books</NavLink>
                <NavLink to='/dashboard'>Dashboard</NavLink>
            </nav>

        </header >

    )
}