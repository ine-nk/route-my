import PostsList from './postsList'
import Post from './post'
import { useParams } from 'react-router-dom'
// import query from 'query-string'
// import _ from 'lodash'

const Posts = () => {
  const params = useParams()
  const posts = [
    { id: 1, label: 'Post 1' },
    { id: 2, label: 'Post 2' },
    { id: 3, label: 'Post 3' },
  ]
  // const postId = match.params.postId
  const { postId } = params

  // const search = query.parse(location.search)
  // const cropPosts = search.count ? _(posts).slice(0).take(search.count).value() : posts
  // console.log('cropPosts', cropPosts)
  return <> { postId ?
    <Post id={ postId } posts={ posts } />
    : <PostsList posts={ posts } /> }
  </>
}

export default Posts
