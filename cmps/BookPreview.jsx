import { utilService } from "../services/util.service.js";

const { useState, useEffect, useRef } = React
const { Link, NavLink, useNavigate } = ReactRouterDOM

export function BookPreview({ book }) {

  const navigate = useNavigate()

  const { id, title, rating, authors, thumbnail, reviews } = book
  const { amount, currencyCode, isOnSale } = book.listPrice

  function onThumbnail() {
    navigate(`/books/${id}`)
  }

  return (
    <React.Fragment>
      <div className='thumbnail-wrapper' onClick={onThumbnail}>
        <img src={`${thumbnail}`} alt={title} className='book-thumbnail' />
        {isOnSale && <span className='ribbon'>On Sale</span>}
      </div>

      {/* <section className='book-content flex flex-column '> */}
      <div className='book-title'><span>title: </span> {title}</div>
      <div><span>price: </span> {utilService.setCurrency(currencyCode)}{amount}</div>
      <div><span className='tag'>rating: </span> {reviews.length > 0 ? (`⭐`).repeat(rating) : 'Not rated'}</div>
      {/* </section> */}
    </React.Fragment>
  )
}