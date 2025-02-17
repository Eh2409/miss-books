import { bookSerevice } from "../services/books.service.js";
import { GoogleBook } from "../cmps/GoogleBook.jsx";
import { Loader } from "../cmps/Loader.jsx";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect, useRef } = React
const { useParams, Link, useNavigate } = ReactRouterDOM


export function BookEdit() {

    const [editBook, setEditBook] = useState(bookSerevice.getEmptyBook())
    const [isLoader, setIsLoader] = useState(false)
    const [isSave, setIsSave] = useState(false)
    console.log(editBook);

    const navigate = useNavigate()
    const params = useParams()


    useEffect(() => {
        if (!params.bookId) return
        setIsLoader(true)
        loadBook()
    }, [])


    function loadBook() {
        bookSerevice.get(params.bookId)
            .then(book => setEditBook({ ...book }))
            .then(() => setIsLoader(false))
            .catch(error => console.error(error))
            .catch(() => showErrorMsg('An error occurred while loading the book'))
    }

    function onSetEditBook(ev) {
        var { value, type, name } = ev.target

        if (name === 'authors') value = value.split(',')
        if (name === 'categories') value = value.split(',')
        if (type === 'number') value = +value

        setEditBook(prev => ({ ...prev, [name]: value }))
    }

    function onSetEditBookNested(ev) {
        var { value, name, type, checked } = ev.target
        var keys = name.split('.')

        if (type === 'number') value = +value
        if (type === 'checkbox') value = checked

        setEditBook(prev => ({
            ...prev,
            [keys[0]]: {
                ...prev[keys[0]],
                [keys[1]]: value
            }
        }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        setIsSave(true)

        editBook.thumbnail = (/\.(jpeg|jpg|gif|png|webp)$/i.test(editBook.thumbnail)) ? editBook.thumbnail : 'assets/img/no-img.png'

        bookSerevice.save(editBook)
            .then(book => navigate(`/books/${book.id}`))
            .then(() => { showSuccessMsg('The book has been successfully saved') })
            .catch(error => console.error(error))
            .catch(() => showErrorMsg('An error occurred while saving the book'))
    }



    const { title, authors, categories, description, publishedDate, pageCount, thumbnail } = editBook
    const { amount, isOnSale } = editBook.listPrice

    if (isLoader) return <Loader />
    return (
        <section className='book-edit-add flex flex-column align-center' >
            <h2>{params.bookId ? 'Edit' : 'Add'} book</h2>
            {!editBook.id && <GoogleBook />}

            {editBook && <form onSubmit={onSaveBook} className='flex flex-column'>
                <label htmlFor="title">title:</label>
                <input type="text" id='title' name='title' value={title} onChange={onSetEditBook} placeholder="Enter book title" required />
                <label htmlFor="authors">authors: {(`(Between each author name insert ',')`)}</label>
                <input type="text" id='authors' name='authors' value={authors} onChange={onSetEditBook} placeholder="Enter book authors" required />
                <label htmlFor="categories">categories: {(`(Between each category name insert ',')`)}</label>
                <input type="text" id='categories' name='categories' value={categories} onChange={onSetEditBook} placeholder="Enter book categories" required />
                <label htmlFor="description">description:</label>
                <input type="text" id='description' name='description' value={description} onChange={onSetEditBook} placeholder="Enter book description" required />
                <label htmlFor="price">price:</label>
                <input type="number" id='price' name='listPrice.amount' value={amount || ''} onChange={onSetEditBookNested} placeholder="Enter book price" required />
                <label htmlFor="publishedDate">published Date:</label>
                <input type="number" id='publishedDate' name='publishedDate' value={publishedDate || ''} onChange={onSetEditBook} placeholder="Enter published date" required />
                <label htmlFor="pageCount">page Count:</label>
                <input type="number" id='pageCount' name='pageCount' value={pageCount || ''} onChange={onSetEditBook} required placeholder="Enter page count" />
                <label htmlFor="thumbnail">thumbnail:</label>
                <input type="url" id='thumbnail' name='thumbnail' value={thumbnail || ''} onChange={onSetEditBook} placeholder="Enter image URL" />
                <div>
                    <label htmlFor="isOnSale">On Sale:</label>
                    <input type="checkbox" id='isOnSale' name='listPrice.isOnSale' checked={isOnSale} onChange={onSetEditBookNested} />
                </div>
                <button>{isSave ? <div className='mini-loader'></div> : 'Save'}</button>

            </form>}

            <button className='go-back-btn'><Link to='/books'>back to books</Link></button>
        </section>
    )
}