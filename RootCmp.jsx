import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"

const { useState, useEffect, useRef } = React

export function App() {
    
    const [page, setPage] = useState('Home')

    function onSetPage(page) {
        setPage(page)
    }


    return (
        <section className="app">
            <header className="app-header flex align-center justify-between">
                <a href="#" onClick = {()=>(onSetPage('Home'))} > <h1>Miss Comics</h1></a>

                <nav className='flex justify-between'>
                    <a href="#" onClick = {()=>(onSetPage('Home'))} >Home</a>
                    <a href="#" onClick = {()=>(onSetPage('About'))} >About</a>
                    <a href="#" onClick = {()=>(onSetPage('Books'))}>Books</a>
                </nav>
            </header>
            <main className="main-layout">
                {page==='Home' && <Home />}
                {page==='About' && <AboutUs/>}
                {page==='Books' && <BookIndex/>}
            </main>
        </section>
    )
}