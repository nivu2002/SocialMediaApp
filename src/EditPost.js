import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router';

const EditPost = ({posts, editBody, setEditBody, setEditTitle, editTitle, handleEdit}) => {
     
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  
  useEffect(() => {
    if(post){
        setEditTitle(post.title);
        setEditBody(post.body);
    }
  },[post,setEditTitle,setEditBody])

    return (
    <main className='NewPost'>
        {editTitle && 
        <>
            <h1>Edit Post</h1>
            <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='postTitle'>Title:</label>
                <input 
                    id='postTitle'
                    required
                    type='text'
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor='postBody'>Post:</label>
                <textarea 
                    id='postBody'
                    required
                    type='text'
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
        </>
        }
        {!editTitle && 
        <>
            <h2>Post Not Found</h2>
            <p>Well, that's Disappointing.</p>
            <p>
                <Link to='/'>Visit Home Page</Link>
            </p>
        </>}
    </main>
  )
}

export default EditPost