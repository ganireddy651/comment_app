import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
    count: 0,
  }

  onChangeValue = event => this.setState({name: event.target.value})

  onTextAreaChange = event => this.setState({comment: event.target.value})

  onButtonClicked = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const bgColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      bgColor,
      isLiked: false,
    }
    this.setState(preState => ({
      commentsList: [...preState.commentsList, newComment],
      count: preState.count + 1,
    }))
    this.setState({name: '', comment: ''})
  }

  onDeleteButtonClicked = id => {
    const {commentsList} = this.state
    const filteredList = commentsList.filter(each => each.id !== id)
    this.setState({commentsList: filteredList})
    this.setState(preState => ({
      count: preState.count - 1,
    }))
  }

  onLikeClicked = id => {
    this.setState(preState => ({
      commentsList: preState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {commentsList, name, comment, count} = this.state

    return (
      <div className="comments-app-container">
        <h1 className="main-heading">Comments</h1>
        <div className="comments-top-section-container">
          <div className="input-field-container">
            <p className="para">Say something about 4.0 Technologies</p>
            <form onSubmit={this.onButtonClicked}>
              <input
                className="name-input"
                value={name}
                type="text"
                placeholder="Your Name"
                onChange={this.onChangeValue}
              />
              <br />
              <textarea
                className="text-area"
                cols="25"
                rows="6"
                placeholder="Your Comment"
                value={comment}
                onChange={this.onTextAreaChange}
              />
              <br />
              <button type="submit" className="add-comment-button">
                Add Comment
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
              alt="comments"
            />
          </div>
        </div>
        <div className="comments-count-container">
          <button className="btn-count-comment" type="button">
            {count}
          </button>
          <span className="span-text">Comments</span>
        </div>
        <ul className="comment-list-container">
          {commentsList.map(each => (
            <CommentItem
              commentDetails={each}
              onDeleteButtonClicked={this.onDeleteButtonClicked}
              onLikeClicked={this.onLikeClicked}
              key={each.id}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
