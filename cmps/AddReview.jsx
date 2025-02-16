import { AvatarPicker } from "./AvatarPicker.jsx";
import { reviewsService } from "../services/reviews.service.js";

const { useState, useEffect, useRef } = React

export function AddReview ({onAddReview}) {


    const [avatar, setAvatar] = useState('assets/img/avatar/1.png')
    const [backgroundColorAvatar, setBackgroundColorAvatar] = useState("#e66465")
    const [isPickerOn, setIsPickerOn] = useState(false)
    const [review, setReview] = useState({...reviewsService.getEmptyReview(), avatar:avatar,color:backgroundColorAvatar})
    const [isChecked, setIsChecked] = useState('')

    const commentFormRef = useRef()
    console.log(review);
    

    function onInpitReview(ev) {
        var {value,type,name,checked,} = ev.target

        if (type==='number') value = +value
        if (name==='rating') value = +value
        if (type==='checkbox') value = checked

        setReview(prev => ({...prev,[name]:value}))
      }
    
      function onSubmit(ev) {
        ev.preventDefault()
        console.log(new Date(review.readAt).getTime());
        review.readAt = new Date(review.readAt).getTime()
        onAddReview(review)
        setReview(prev=> ({...reviewsService.getEmptyReview(), avatar:avatar,color:backgroundColorAvatar}))
        commentFormRef.current.reset()
setIsChecked('')
      }
    
      function onSetAvatar(ev) {
        var {name,src} = ev.target
        setAvatar(src)
        setIsPickerOn(prev => prev = !isPickerOn)
        setReview(prev => ({...prev,[name]:src}))
      }

      function setAvatarBackground(ev) {
        const color = ev.target.value
        setBackgroundColorAvatar(color)
        setReview(prev=> ({...prev ,color:color}))
      }

      function onSetIsChecked({target}) {
        setIsChecked(target.value)
      }

    return(
        <section className='add-review'>
            
            <div className="avatar-container flex flex-column align-center ">
                <img src={avatar} alt="" className={`avatar  ${isPickerOn ? 'active' : ''}`}
                 onClick={()=>(setIsPickerOn(prev => prev = !isPickerOn))}  style={{ '--avatarColor': `${backgroundColorAvatar}` }}/>
                  <AvatarPicker onSetAvatar={onSetAvatar}/>
                 <input type="color" className='avatar-color' value={backgroundColorAvatar} onChange={setAvatarBackground} />
            </div>

                <form onSubmit={onSubmit} ref={commentFormRef}>
                <label htmlFor="fullname" className="full-name flex align-center">
                <span>Name:</span>
                <input type="text" id='fullname' name='fullname' placeholder='Enter your full name' onChange={onInpitReview} required/>
                </label>

                <label htmlFor="readAt" className="read-at flex align-center">
                    <span>Read at: </span>
                <input type="date" id='readAt' name='readAt' value={review.readAt} onChange={onInpitReview} required />
                </label>

                <label className="rating flex align-center"> 
                    <span>Rate the book: </span> 
                <div className="star-rating">
                    <input type="radio" name="rating" id="star-5" value="5" checked={isChecked=== '5'} 
                    onChange={(event) => {onInpitReview(event); onSetIsChecked(event)}}/>
                    <label htmlFor="star-5" className="fa star" ></label>
                    <input type="radio" name="rating" id="star-4" value="4" checked={isChecked === '4'}
                      onChange={(event) => {onInpitReview(event); onSetIsChecked(event)}}/>
                    <label htmlFor="star-4" className="fa star"></label>
                    <input type="radio" name="rating" id="star-3" value="3" checked={isChecked === '3'}
                      onChange={(event) => {onInpitReview(event); onSetIsChecked(event)}}/>
                    <label htmlFor="star-3" className="fa star"></label>
                    <input type="radio" name="rating" id="star-2" value="2" checked={isChecked === '2'} 
                     onChange={(event) => {onInpitReview(event); onSetIsChecked(event)}}/>
                    <label htmlFor="star-2" className="fa star"></label>
                    <input type="radio" name="rating" id="star-1" value="1" checked={isChecked === '1'} 
                     onChange={(event) => {onInpitReview(event); onSetIsChecked(event)}}/>
                    <label htmlFor="star-1" className="fa star"></label>
                </div></label>

                <textarea className="comment-box" name="comment" id="comment" rows="5" placeholder='Enter your comment' onChange={onInpitReview}></textarea>
                <button className='submit-btn'>Submit</button>
            </form>
        </section>
    )
}