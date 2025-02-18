import { utilService } from '../services/util.service.js'
import { MoreFilters } from './MoreFilters.jsx'

const { useState, useEffect, useRef } = React

export function BookFilter({ filterBy, onSetFilterBy, defaultFilterBy }) {

  const [editFilterBy, setEditFilterBy] = useState({ ...filterBy })
  const [moreFilters, setMoreFilters] = useState(false)

  // debounce
  // const filterDebounce = useRef(utilService.debounce(onSetFilterBy, 1000))
  // console.log(editFilterBy)

  const formRef = useRef()
  const defaultFilterRef = useRef({ ...defaultFilterBy })

  useEffect(() => {
    // filterDebounce.current(editFilterBy)
    onSetFilterBy(editFilterBy)
  }, [editFilterBy])

  function onSetEditFilterBy(ev) {
    var { value, type, name, checked } = ev.target


    if (type === 'number') value = +value
    if (type === 'checkbox') value = checked
    console.log(typeof value);

    setEditFilterBy(prev => ({ ...prev, [name]: value }))
  }

  // function onSubmit(ev) {
  //   ev.preventDefault()
  //   onSetFilterBy(editFilterBy)
  // }

  function onReset() {
    formRef.current.reset()
    setEditFilterBy({ ...defaultFilterRef.current })
  }

  // fnc with view transition
  // function onMoreFilters() {
  //   document.startViewTransition(() => {
  //     setMoreFilters(prev => !prev)
  //   })
  // }


  function onMoreFilters() {
    setMoreFilters(prev => !prev)
  }

  const { title, price } = filterBy

  return (
    <section className='main-filter'>
      <h3>filter books</h3>
      <form className='flex flex-column align-center' ref={formRef}>
        <label htmlFor="title">title:</label>
        <input type="search" name='title' id='title' value={title} onChange={onSetEditFilterBy} placeholder='Enter book title' />
        <label htmlFor="price">min price:</label>
        <input type="number" name='price' id='price' value={+price || ''} onChange={onSetEditFilterBy} placeholder='Enter book pirce number' />
        {moreFilters && <MoreFilters onSetEditFilterBy={onSetEditFilterBy} filterBy={filterBy} />}
        {/* <button>Search</button> */}
        <div className='filter-btn flex justify-center  align-center'>
          <button type='button' onClick={onReset}>reset</button>
          <div className='more-filtes-btn' onClick={onMoreFilters}>
            {moreFilters ? 'Less Filters' : 'More Filters'}
          </div>
        </div>
      </form>
    </section>
  )
}