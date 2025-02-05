import { bookSerevice } from "../services/books.service.js";
const { useState, useEffect, useRef } = React

export function BookEdit ({onEditBook,editBookId,onSetSevedBook}) {


    const [editBook, setEditBook] = useState(null)

    const modal = useRef(null) 
    

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

        if (type === 'number') value= +value
        setEditBook(prev => ({...prev,[name]:value}))
    }

    function onSetEditBookNested (ev) {
        var {value,name,type} = ev.target
        var keys = name.split('.')
        
        if (type === 'number') value= +value
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
                    <label htmlFor="title">title</label>
                    <input type="text" id='title' name='title' value={editBook.title} onChange={onSetEditBook} />
                    <label htmlFor="description">description</label>
                    <input type="text" id='description' name='description' value={editBook.description} onChange={onSetEditBook} />
                    <label htmlFor="price">price</label>
                    <input type="number" id='price' name='listPrice.amount' value={editBook.listPrice.amount || ''} onChange={onSetEditBookNested} />
                <button>save</button>
                <button type="button" className='close-btn' onClick={onCloseModalBtn}>X</button>
                </pre>}
            </form>
        </dialog>
    </section>
  )
}