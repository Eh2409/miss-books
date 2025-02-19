import { AvatarPicker } from "./AvatarPicker.jsx";
import { reviewsService } from "../services/reviews.service.js";
import { RateByStars } from "./RateByStars.jsx";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { RateByTextbox } from "./RateByTextbox.jsx";
import { RateBySelect } from "./RateBySelect.jsx";

const { useState, useEffect, useRef } = React

export function AddReview({ onAddReview }) {


  const [avatar, setAvatar] = useState('assets/img/avatar/1.png')
  const [backgroundColorAvatar, setBackgroundColorAvatar] = useState("#e66465")
  const [isPickerOn, setIsPickerOn] = useState(false)
  const [review, setReview] = useState({ ...reviewsService.getEmptyReview(), avatar: avatar, color: backgroundColorAvatar })
  const [isChecked, setIsChecked] = useState('')
  const [inputType, setInputType] = useState('stars')
  console.log(inputType);


  const commentFormRef = useRef()
  // console.log(review);


  function onInpitReview(ev) {
    var { value, type, name, checked, } = ev.target

    if (type === 'number') value = +value
    if (name === 'rating') value = +value
    if (type === 'checkbox') value = checked

    setReview(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    if (review.rating === 0) {
      showErrorMsg('The books rating is not filled in. Please provide a rating')
      return
    }
    console.log(new Date(review.readAt).getTime());
    review.readAt = new Date(review.readAt).getTime()
    onAddReview(review)
    setReview(prev => ({ ...reviewsService.getEmptyReview(), avatar: avatar, color: backgroundColorAvatar }))
    commentFormRef.current.reset()
    setIsChecked('')
  }

  function onSetAvatar(ev) {
    var { name, src } = ev.target
    setAvatar(src)
    setIsPickerOn(prev => prev = !isPickerOn)
    setReview(prev => ({ ...prev, [name]: src }))
  }

  function setAvatarBackground(ev) {
    const color = ev.target.value
    setBackgroundColorAvatar(color)
    setReview(prev => ({ ...prev, color: color }))
  }

  function onSetIsChecked({ target }) {
    setIsChecked(target.value)
  }

  function onSetInputType({ target }) {
    setInputType(target.value)
  }

  return (
    <section className='add-review'>

      <div className="avatar-container flex flex-column align-center ">
        <img src={avatar} alt="" className={`avatar  ${isPickerOn ? 'active' : ''}`}
          onClick={() => (setIsPickerOn(prev => prev = !isPickerOn))} style={{ '--avatarColor': `${backgroundColorAvatar}` }} />
        <AvatarPicker onSetAvatar={onSetAvatar} />
        <input type="color" className='avatar-color' value={backgroundColorAvatar} onChange={setAvatarBackground} />
      </div>

      <form onSubmit={onSubmit} ref={commentFormRef}>
        <label htmlFor="fullname" className="full-name flex align-center">
          <span>Name:</span>
          <input type="text" id='fullname' name='fullname' placeholder='Enter your full name' onChange={onInpitReview} required />
        </label>

        <label htmlFor="readAt" className="read-at flex align-center">
          <span>Read at: </span>
          <input type="date" id='readAt' name='readAt' value={review.readAt} onChange={onInpitReview} required />
        </label>

        <label className="rating flex align-center">
          <span>Rate: </span>
          <select name="rating-type" id="rating-type" value={inputType} onChange={onSetInputType}>
            <option value="stars">Stars</option>
            <option value="select">Select</option>
            <option value="textbox">Textbox</option>
          </select>
          <DynamicInput inputType={inputType} onInpitReview={onInpitReview} onSetIsChecked={onSetIsChecked} isChecked={isChecked} />
        </label>

        <textarea className="comment-box" name="comment" id="comment" rows="5" placeholder='Enter your comment' onChange={onInpitReview}></textarea>
        <button className='submit-btn'>Submit</button>
      </form>
    </section>
  )
}

function DynamicInput({ inputType, onInpitReview, onSetIsChecked, isChecked }) {
  switch (inputType) {
    case 'stars':
      return <RateByStars onSetIsChecked={onSetIsChecked} isChecked={isChecked} onInpitReview={onInpitReview} />
    case 'textbox':
      return <RateByTextbox onInpitReview={onInpitReview} />
    case 'select':
      return <RateBySelect onInpitReview={onInpitReview} />
    default:
      return null
  }
}