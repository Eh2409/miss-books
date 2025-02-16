import { About } from "./cmps/About.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"
import { ContactUs } from "./cmps/ContactUs.jsx"
import { Newsletter } from "./cmps/NewsLetter.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"

const Router =  ReactRouterDOM.HashRouter
const {Routes, Route } = ReactRouterDOM

export function App() {

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

                    <Route path='/books/book-add' element = {<BookEdit/>}/>
                    <Route path='/books/book-edit/:bookId' element = {<BookEdit/>}/>

                </Routes>
            </main>
        </section>
        </Router>
    )
}