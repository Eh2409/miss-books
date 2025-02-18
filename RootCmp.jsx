import { About } from "./cmps/About.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { ContactUs } from "./cmps/ContactUs.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Newsletter } from './cmps/Newsletter.jsx'
import { Home } from "./pages/Home.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

export function App() {

    return (
        <Router>
            <section className="app">

                <AppHeader />

                <main className="main-layout">
                    <Routes>
                        <Route path='/' element={<Home />} />

                        <Route path='/about-us' element={<AboutUs />}>
                            <Route index element={<About />} />
                            <Route path='about' element={<About />} />
                            <Route path='contact-us' element={<ContactUs />} />
                            <Route path='newsletter' element={<Newsletter />} />
                        </Route>

                        <Route path='/books' element={<BookIndex />} />
                        <Route path='/books/:bookId' element={<BookDetails />} />

                        <Route path='/books/book-add' element={<BookEdit />} />
                        <Route path='/books/book-edit/:bookId' element={<BookEdit />} />

                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}