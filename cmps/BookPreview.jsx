import { LongTxt } from "./LongTxt.jsx"

const { useState, useEffect, useRef } = React

export function BookPreview ({book}) {

  const {title,description,thumbnail} = book
  const {amount,isOnSale} = book.listPrice

  return(
    <React.Fragment>  
  <section className='book-content'>
    <h3><span>title: </span> {title}</h3>
    <h4><span>price: </span> ${amount}</h4>
    <h4>
      <span>description: </span>
      <LongTxt description={description} length={100}/>
    </h4>
    </section>
    <div className='thumbnail-wrapper'>
            <img src={`${thumbnail}`} alt={title} className='book-thumbnail'/>
            {isOnSale && <span className='ribbon'>On Sale</span> }
    </div>
    </React.Fragment>  
  )
}