
const {NavLink} = ReactRouterDOM

export function AppHeader (props) {
  
    return(
        <React.Fragment>  
             <h1 className='main-logo'> <NavLink to='/'> Miss Comics</NavLink></h1>
                <nav className='flex justify-between'>
                <NavLink to='/'> Home</NavLink>
                <NavLink to='/about-us'>About</NavLink>
                <NavLink to='/books'>Books</NavLink>
                </nav>
        </React.Fragment>  
    )
}