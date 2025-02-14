
export function ReviewPreview ({review}) {

    const {avatar,color,fullname,readAt,rating,comment} = review
  return(
    <React.Fragment>  
         <img src={avatar} alt="user-avatar" className='user-avatar'   style={{ backgroundColor: color }}  />
            <div className='review-content'>
                <div className='full-name'><span>Name:</span> {fullname}</div>
                <div className='read-at'><span>Read At: </span> {new Date(readAt).toLocaleDateString()}</div>
                <div className='rating'> <span>Rating:</span>{(`⭐`).repeat(rating)}</div>
                <pre className='comment'>{comment}</pre>
            </div>
    </React.Fragment>  
  )
}