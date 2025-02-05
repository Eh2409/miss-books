
const { useState, useEffect, useRef } = React

export function BookPreview ({book}) {

    const {title,description,thumbnail} = book
    const {amount,isOnSale} = book.listPrice


  return(
    <React.Fragment>  
  <section className='book-content flex flex-column space-around'>
    <h3><span>title: </span> {title}</h3>
    <h4><span>description: </span> {description}</h4>
    <h4><span>price: </span> ${amount}</h4>
    </section>
    <div className='thumbnail-wrapper'>
            <img src={`${thumbnail}`} alt={title} className='book-thumbnail'/>
            {isOnSale && <span className='ribbon'>On Sale</span> }
    </div>
    </React.Fragment>  
  )
}