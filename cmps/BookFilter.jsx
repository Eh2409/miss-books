
const { useState, useEffect, useRef } = React

export function BookFilter ({filterBy,onSetFilterBy}) {

  const [editFilterBy, setEditFilterBy] = useState({...filterBy})

  useEffect(()=>{
    onSetFilterBy(editFilterBy)
  },[editFilterBy])
  
  function onSetEditFilterBy(ev) {
    var {value,type,name,checked } = ev.target
    
    if (type==='number') value = +value
    if (type==='checkbox') value = checked
    setEditFilterBy(prev => ({...prev,[name]:value}))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSetFilterBy(editFilterBy)
  }

    return(
        <section className='main-filter'>
          <h3>filter books</h3>
            <form className='flex flex-column' onSubmit ={onSubmit}>
            <label htmlFor="title">title:</label>
            <input type="search" name='title' id='title'  onChange={onSetEditFilterBy}/>
            <label htmlFor="price">min price:</label>
            <input type="number" name='price' id='price' onChange={onSetEditFilterBy}/>
            <label htmlFor="pageCount">min page Count:</label>
            <input type="number" name='pageCount' id='pageCount' onChange={onSetEditFilterBy}/>
            <label htmlFor="publishedDate">published Date:</label>
            <input type="number" min="1900" max="2099" step="1" name='publishedDate' id='publishedDate' onChange={onSetEditFilterBy} />
            <label htmlFor="authors">authors:</label>
            <input type="search" name='authors' id='authors' onChange={onSetEditFilterBy}/>
            <label htmlFor="categories">categories:</label>
            <input type="search" name='categories' id='categories' onChange={onSetEditFilterBy}/>
            <label htmlFor="isOnSale">on sale:</label>
            <input type="checkbox" name='isOnSale' id='isOnSale' onChange={onSetEditFilterBy}/>
            <button>Search</button>
            </form>
        </section>
    )
}