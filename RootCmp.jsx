import { AppHeader } from "./cmps/AppHeader.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"

const Router =  ReactRouterDOM.HashRouter
const {Routes, Route } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function App() {
    
    const [page, setPage] = useState('Home')

    function onSetPage(page) {
        setPage(page)
    }


    return (
        <Router>
        <section className="app">
            <header className="app-header flex align-center justify-between">
                <AppHeader/>
            </header>
            <main className="main-layout">
                <Routes>
                    <Route path='/' element = {<Home />}/>
                    <Route path='/about' element = {<AboutUs />}/>
                    <Route path='/books' element = {<BookIndex />}/>
                </Routes>
            </main>
        </section>
        </Router>
    )
}