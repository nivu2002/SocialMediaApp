import React from 'react'
import { useParams } from 'react-router'

const Post = () => {
    const { id } = useParams()
  return (
    <div>
      <br></br>
      Post {id}
    </div>
  )
}

export default Post