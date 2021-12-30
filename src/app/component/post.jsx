import React from 'react'
import { useHistory } from 'react-router-dom'
const Post = ({ id, posts }) => {
  // const postId = match.params.postId
  const history = useHistory()
  const getPostById = (id) => {
    return posts.find((post) => (post.id.toString() === id))
  }
  const handleSave = () => {
    history.push('/posts')
    // history.replace('/posts')

  }
  const post = getPostById(id)

  return (<>
    <h3>{ post ? post.label : `Post with id=${id} not found` }</h3>
    <button onClick={ () => { handleSave() } }>Сохранить</button>
  </>)
}

export default Post
