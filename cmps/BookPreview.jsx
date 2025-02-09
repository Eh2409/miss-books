import { LongTxt } from "./LongTxt.jsx"
import { utilService } from "../services/util.service.js";

const { useState, useEffect, useRef } = React

export function BookPreview ({book,OnSetSelectedBookId}) {

  const {id,title,description,thumbnail} = book
  const {amount,currencyCode,isOnSale} = book.listPrice

  return(
    <React.Fragment>  
  <section className='book-content flex flex-column'>
    <div className='book-title'><span>title: </span> {title}</div>
    <div><span>price: </span> {utilService.setCurrency(currencyCode)}{amount}</div>
    <div>
      <span>description: </span>
      <LongTxt description={description} length={100}/>
    </div>
    </section>
    <div className='thumbnail-wrapper' onClick ={()=>{OnSetSelectedBookId(id)}}>
            <img src={`${thumbnail}`} alt={title} className='book-thumbnail'/>
            {isOnSale && <span className='ribbon'>On Sale</span> }
    </div>
    </React.Fragment>  
  )
}