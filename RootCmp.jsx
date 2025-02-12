import { About } from "./cmps/About.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookAdd } from "./cmps/BookAdd.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { ContactUs } from "./cmps/ContactUs.jsx"
import { Newsletter } from "./cmps/NewsLetter.jsx"
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

                    <Route path='/about-us' element = {<AboutUs />}>
                    <Route index element = {<About/>}/>
                    <Route path='about' element = {<About/>}/>
                    <Route path='contact-us' element = {<ContactUs />}/>
                    <Route path='newsletter' element = {<Newsletter />}/>
                    </Route>

                    <Route path='/books' element = {<BookIndex />}/>
                    <Route path='/books/:bookId' element = {<BookDetails/>}/>
                    <Route path='/book-add' element = {<BookAdd/>}/>

                </Routes>
            </main>
        </section>
        </Router>
    )
}