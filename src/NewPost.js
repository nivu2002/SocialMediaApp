import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const NewPost = () => {
  const {postTitle, setPostTitle, postBody, setPostBody, handleSubmit} = useContext(DataContext)
  return (
    <main className='NewPost'>
        <h1>New Post</h1>
        <form className='newPostForm' onSubmit={handleSubmit}>
          <label htmlFor='postTitle'>Title:</label>
          <input 
          id='postTitle'
          required
          type='text'
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          />
          <label htmlFor='postBody'>Post:</label>
          <textarea 
          id='postBody'
          required
          type='text'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default NewPost