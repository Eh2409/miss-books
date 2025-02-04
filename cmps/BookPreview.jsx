
const { useState, useEffect, useRef } = React

export function BookPreview ({book}) {

    const {title,description,thumbnail} = book
    const {amount} = book.listPrice


  return(
    <React.Fragment>  
  <section className='book-content flex flex-column space-around'>
    <h3><span>title: </span> {title}</h3>
    <h4><span>description: </span> {description}</h4>
    <h4><span>price: </span> ${amount}</h4>
    </section>
    <img src={`${thumbnail}`} alt={title} className='book-thumbnail'/>
    </React.Fragment>  
  )
}