import { bookSerevice } from "../services/books.service.js";
import { GoogleBook } from "./GoogleBook.jsx";
import { Loader } from "./Loader.jsx";

const { useState, useEffect, useRef } = React
const {useParams,Link, useNavigate} = ReactRouterDOM


export function BookEdit (props) {

    const [editBook, setEditBook] = useState(bookSerevice.getEmptyBook())
    const [isLoader,setIsLoader] = useState(false)
    const [isSave, setIsSave] = useState(false)
    console.log(editBook);

    const navigate = useNavigate()
    const params = useParams()
    
    
    useEffect(()=>{
        if (!params.bookId) return
        setIsLoader(true)
        loadBook()
    },[])


    function loadBook() {
        bookSerevice.get(params.bookId)
        .then(book=> setEditBook({...book}))
        .then(()=>  setIsLoader(false))
    }

    function onSetEditBook(ev) {
        var {value,type,name} = ev.target

        if (name === 'authors') value = value.split(',')
        if (name === 'categories') value = value.split(',')
        if (type === 'number') value= +value
        setEditBook(prev => ({...prev,[name]:value}))
    }

    function onSetEditBookNested (ev) {
        var {value,name,type,checked} = ev.target
        var keys = name.split('.')
        
        if (type === 'number') value= +value
        if (type==='checkbox') value = checked

        setEditBook(prev => ({...prev,
            [keys[0]]:{
                ...prev[keys[0]],
                [keys[1]]:value
        }}))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookSerevice.save(editBook)
        .then(book => navigate(`/books/${book.id}`))
    }

    

    const {title,authors,categories,description,publishedDate,pageCount} = editBook
    const {amount, isOnSale} = editBook.listPrice

    if (isLoader) return <Loader/>
    return(
    <section className = 'book-edit-add flex flex-column align-center' >
        <h2>{params.bookId ? 'Edit' : 'Add'} book</h2>
         {!editBook.id && <GoogleBook/>}

         {editBook && <form onSubmit={onSaveBook} className='flex flex-column'> 
                    <label htmlFor="title">title:</label>
                    <input type="text" id='title' name='title' value={title} onChange={onSetEditBook} required  />
                    <label htmlFor="authors">authors: {(`(Between each author name insert ',')`)}</label>
                    <input type="authors" id='authors' name='authors' value={authors} onChange={onSetEditBook} required  />
                    <label htmlFor="categories">categories: {(`(Between each category name insert ',')`)}</label>
                    <input type="authors" id='categories' name='categories' value={categories} onChange={onSetEditBook} required />
                    <label htmlFor="description">description:</label>
                    <input type="text" id='description' name='description' value={description} onChange={onSetEditBook} required  />
                    <label htmlFor="price">price:</label>
                    <input type="number" id='price' name='listPrice.amount' value={amount || ''} onChange={onSetEditBookNested}  required />
                    <label htmlFor="publishedDate">published Date:</label>
                    <input type="number" id='publishedDate' name='publishedDate' value={publishedDate || ''}  onChange={onSetEditBook}  required  />
                    <label htmlFor="pageCount">page Count:</label>
                    <input type="number" id='pageCount' name='pageCount' value={pageCount || ''}  onChange={onSetEditBook} required  />
                    <div>
                    <label htmlFor="isOnSale">On Sale:</label>
                    <input type="checkbox" id='isOnSale' name='listPrice.isOnSale' checked={isOnSale} onChange={onSetEditBookNested} />
                    </div>
                <button onClick ={()=>{setIsSave(true)}}>{isSave ? <div className='mini-loader'></div> : 'Save' }</button>
                
        </form>}

            <button className='go-back-btn'><Link to='/books'>back to books</Link></button>
    </section>
  )
}