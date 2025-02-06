import { bookSerevice } from "../services/books.service.js";
import { Loader } from "./Loader.jsx";
const { useState, useEffect, useRef } = React

export function BookEdit ({onEditBook,editBookId,onSetSevedBook}) {


    const [editBook, setEditBook] = useState(null)

    const modal = useRef(null) 
    console.log(modal);
    console.log(modal.current);
    
    

    useEffect(()=>{
        if (modal.current) {
            onGetBook(editBookId)
            document.addEventListener('keydown',onEscape)
        }

        return(()=>{  
            onEditBook(null)
            document.removeEventListener('keydown',onEscape)
        })
    },[])


    function onEscape(ev) {
        if (ev.key==='Escape') {
            onEditBook(null)
        }
    }

    function onGetBook(editBookId) {
        bookSerevice.get(editBookId)
        .then(book=> setEditBook({...book}))
        .then(res=> modal.current.showModal())
    }

    function onCloseModalBtn() {
        onEditBook(null)
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
        onSetSevedBook(editBook)
    }

    function onClickOutsideModelCheck(ev) {
        if(ev.target === modal.current){
            onEditBook(null)
        }
    }
    
    
    return(
    <section>
        <dialog ref={modal} className = 'add-edit-modal' onClick={onClickOutsideModelCheck}>
            <form method="dialog" onSubmit={onSaveBook}> 
                {editBook &&
                <pre className='flex flex-column'>
                    <h2>Edit book</h2>
                    <label htmlFor="title">title:</label>
                    <input type="text" id='title' name='title' value={editBook.title} onChange={onSetEditBook} required  />
                    <label htmlFor="authors">authors: {(`(Between each author name insert ',')`)}</label>
                    <input type="authors" id='authors' name='authors' value={editBook.authors} onChange={onSetEditBook} required  />
                    <label htmlFor="categories">categories: {(`(Between each category name insert ',')`)}</label>
                    <input type="authors" id='categories' name='categories' value={editBook.categories} onChange={onSetEditBook} required />
                    <label htmlFor="description">description:</label>
                    <input type="text" id='description' name='description' value={editBook.description} onChange={onSetEditBook} required  />
                    <label htmlFor="price">price:</label>
                    <input type="number" id='price' name='listPrice.amount' value={editBook.listPrice.amount || ''} onChange={onSetEditBookNested}  required />
                    <label htmlFor="publishedDate">published Date:</label>
                    <input type="number" id='publishedDate' name='publishedDate' value={editBook.publishedDate || ''}  onChange={onSetEditBook}  required  />
                    <label htmlFor="pageCount">page Count:</label>
                    <input type="number" id='pageCount' name='pageCount' value={editBook.pageCount || ''}  onChange={onSetEditBook} required  />
                    <div>
                    <label htmlFor="isOnSale">On Sale:</label>
                    <input type="checkbox" id='isOnSale' name='listPrice.isOnSale' checked={editBook.listPrice.isOnSale} onChange={onSetEditBookNested} />
                    </div>
                <button>save</button>
                <button type="button" className='close-btn' onClick={onCloseModalBtn}>X</button>
                </pre>}
            </form>
        </dialog>
        {!editBook && <Loader/>}
    </section>
  )
}