import { utilService } from '../services/util.service.js'

const { useState, useEffect, useRef } = React

export function BookFilter ({filterBy,onSetFilterBy}) {

  const [editFilterBy, setEditFilterBy] = useState({...filterBy})
  const [minRating, setminRating] = useState(0)

  // debounce
  // const filterDebounce = useRef(utilService.debounce(onSetFilterBy, 1000))
  console.log(editFilterBy)

  const formRef = useRef()
  const defaultFilterRef= useRef({...filterBy})

  useEffect(()=>{
    // filterDebounce.current(editFilterBy)
    onSetFilterBy(editFilterBy)
  },[editFilterBy])
  
  function onSetEditFilterBy(ev) {
    var {value,type,name,checked } = ev.target

    if (name === 'rating') setminRating(value)
    if (type==='number') value = +value
    if (type==='checkbox') value = checked
    setEditFilterBy(prev => ({...prev,[name]:value}))
  }

  // function onSubmit(ev) {
  //   ev.preventDefault()
  //   onSetFilterBy(editFilterBy)
  // }

  function onReset() {
    formRef.current.reset()
    setminRating(0)
    setEditFilterBy(defaultFilterRef.current)
  }
  
    return(
        <section className='main-filter'>
          <h3>filter books</h3>
            <form className='flex flex-column' ref={formRef}>
            <label htmlFor="title">title:</label>
            <input type="search" name='title' id='title' onChange={onSetEditFilterBy}  placeholder='Enter book title'/>
            <label htmlFor="price">min price:</label>
            <input type="number" name='price' id='price' onChange={onSetEditFilterBy}  placeholder='Enter book pirce number'/>
            <label htmlFor="pageCount">min page Count:</label>
            <input type="number" name='pageCount' id='pageCount' onChange={onSetEditFilterBy} placeholder='Enter book page count number' />
            <label htmlFor="publishedDate">published Date:</label>
            <input type="number" min="1900" max="2099" step="1" name='publishedDate' id='publishedDate' onChange={onSetEditFilterBy} placeholder='Enter book publish year' />
            <label htmlFor="authors">authors:</label>
            <input type="search" name='authors' id='authors' onChange={onSetEditFilterBy} placeholder='Enter book authors name'/>
            <label htmlFor="categories">category:</label>
            <input type="search" name='categories' id='categories' onChange={onSetEditFilterBy} placeholder='Enter book category name'/>
            <label htmlFor="isOnSale">on sale:</label>
            <input type="checkbox" name='isOnSale' id='isOnSale' onChange={onSetEditFilterBy}/>
            <label htmlFor="rating">min rating{` (${minRating}) `}:</label>
            <input type="range" min="0" max="5" step="1" value={minRating} name='rating' id='rating' onChange={onSetEditFilterBy} placeholder='Enter book publish year' />
            {/* <button>Search</button> */}
            <button type='button' onClick={onReset}>reset</button>
            </form>
        </section>
    )
}