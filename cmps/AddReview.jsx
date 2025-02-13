const { useState, useEffect, useRef } = React

export function AddReview ({onAddReview}) {

    const [review, setReview] = useState(
        {avatar:'assets/img/back4.png',fullname:'',readAt:'',rating: 0,comment:''}
    )

    const commentFormRef = useRef()

    console.log(review);
    

    function onInpitReview(ev) {
        var {value,type,name,checked } = ev.target
        
        if (type==='number') value = +value
        if (name==='rating') value = +value
        if (type==='checkbox') value = checked
        setReview(prev => ({...prev,[name]:value}))
      }
    
      function onSubmit(ev) {
        ev.preventDefault()
        commentFormRef.current.reset()
        onAddReview(review)
        setReview(prev=> ({...prev ,fullname:'',readAt:'',rating: 0,comment:''}))
      }
    
  
    return(
        <section className='add-review'>
         
                <img src="assets/img/back4.png" alt="" className='avatar' />

                <form onSubmit={onSubmit} ref={commentFormRef}>
                <label htmlFor="fullname" className="full-name flex align-center">
                <span>Name:</span>
                <input type="text" id='fullname' name='fullname' placeholder='Enter your full name' onChange={onInpitReview} required/>
                </label>

                <label htmlFor="readAt" className="read-at flex align-center">
                    <span>Read at: </span>
                <input type="date" id='readAt' name='readAt' onChange={onInpitReview} required />
                </label>

                <label className="rating flex align-center"> 
                    <span>Rate the book: </span> 
                <div className="star-rating">
                    <input type="radio" name="rating" id="star-5" value="5" onChange={onInpitReview}/>
                    <label htmlFor="star-5" className="fa star" ></label>
                    <input type="radio" name="rating" id="star-4" value="4" onChange={onInpitReview}/>
                    <label htmlFor="star-4" className="fa star"></label>
                    <input type="radio" name="rating" id="star-3" value="3" onChange={onInpitReview}/>
                    <label htmlFor="star-3" className="fa star"></label>
                    <input type="radio" name="rating" id="star-2" value="2" onChange={onInpitReview}/>
                    <label htmlFor="star-2" className="fa star"></label>
                    <input type="radio" name="rating" id="star-1" value="1" onChange={onInpitReview}/>
                    <label htmlFor="star-1" className="fa star"></label>
                </div></label>

                <textarea className="comment-box" name="comment" id="comment" rows="5" placeholder='Enter your comment' onChange={onInpitReview}></textarea>
                <button className='submit-btn'>Submit</button>
            </form>
        </section>
    )
}