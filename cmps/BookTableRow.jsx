import { LongTxt } from "./LongTxt.jsx";

const { Link } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function BookTableRow({ book, onRemoveBook, onSetIsRemoveBookload, isRemoveBookload }) {

    const [isBookPreviewOpen, setIsBookPreviewOpen] = useState(false)

    function onSetIsBookPreviewOpen() {
        setIsBookPreviewOpen(prev => prev = !isBookPreviewOpen)
    }

    const { id, title, authors, description, thumbnail, rating, reviews } = book
    const { amount, isOnSale } = book.listPrice

    return (
        < React.Fragment >
            <tr className='book-row'>
                <td onClick={onSetIsBookPreviewOpen}>
                    <span className={isBookPreviewOpen ? 'fa minus' : 'fa plus'}></span>
                </td>
                <td>{title} {isOnSale ? <span className='on-sale'>on sale!</span> : ''} </td>
                <td>{amount}</td>
                <td>{reviews.length > 0 ? (`⭐`).repeat(rating) : 'Not rated'}</td>
                <td className='book-btns flex justify-between'>
                    <button><Link to={`/books/${id}`}>details</Link></button>
                    <button><Link to={`/books/book-edit/${id}`}>edit</Link></button>
                    <button onClick={() => { onRemoveBook(id); onSetIsRemoveBookload(id) }}>
                        {isRemoveBookload === id ? <div className='mini-loader'></div> : 'remove'}</button>
                </td>
            </tr>
            <tr className={`book-tabel-preview ${isBookPreviewOpen ? 'open' : 'close'}`}>
                <td colSpan="5">
                    <div className='book-info'>
                        <img src={thumbnail} alt="" className='book-thumbnail' />
                        <div className='book-info-content'>
                            <div><span>title: </span>{title}</div>
                            <div><span>authors: </span>{authors}</div>
                            <div><span>description: </span><LongTxt description={description} /></div>
                        </div>
                    </div>
                </td>
            </tr>
        </React.Fragment >
    )
}