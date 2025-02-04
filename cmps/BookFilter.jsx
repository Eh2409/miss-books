
const { useState, useEffect, useRef } = React

export function BookFilter ({filterBy,onSetFilterBy}) {

  const [editFilterBy, setEditFilterBy] = useState({...filterBy})

  
  function onSetEditFilterBy(ev) {
    var {value,type,name} = ev.target
    if (type==='number') value = +value
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
            <input type="text" name='title' id='title'  onChange={onSetEditFilterBy}/>
            <label htmlFor="price">price:</label>
            <input type="number" name='price' id='price' onChange={onSetEditFilterBy}/>
            <button>Search</button>
            </form>
        </section>
    )
}