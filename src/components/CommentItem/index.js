import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, onDeleteButtonClicked, onLikeClicked} = props
  console.log(commentDetails)
  const {id, name, comment, bgColor, isLiked} = commentDetails
  console.log(name, comment, bgColor)
  const imageSrc = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeText = isLiked ? 'Liked' : 'Like'

  const buttonClassName = isLiked ? 'liked-button' : 'custom-btn'

  const logo = name[0]
  const onDelete = () => {
    onDeleteButtonClicked(id)
  }
  const onLikeClick = () => {
    onLikeClicked(id)
  }

  return (
    <li className="list">
      <div className="comment-container">
        <div className="comment-sub-container">
          <div className={`bg-logo ${bgColor}`}>{logo}</div>
          <p className="name">{name}</p>
          <p className="posted-time">{formatDistanceToNow(new Date())}</p>
        </div>

        <p className="comment">{comment}</p>
        <div className="like-delete-container">
          <div className="like-container">
            <img src={imageSrc} alt="like" className="like-image" />
            <button
              type="button"
              className={buttonClassName}
              onClick={onLikeClick}
            >
              {likeText}
            </button>
          </div>
          <button
            type="button"
            className="delete-button"
            data-testid="delete"
            onClick={onDelete}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="delete-image"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default CommentItem
