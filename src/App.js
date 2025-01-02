import React, { use, useEffect, useState } from 'react'
import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { Link, Navigate, Route, Routes } from 'react-router'
import Post from './Post'
import PostLayout from './PostLayout'
import { format } from 'date-fns'

const App = () => {

  const [posts,setPosts] = useState([
    {
      id: 1,
      title: 'Post 1',
      datetime: '2nd Jan 2025, 2 PM',
      body: 'Im learning MERN'
    },
    {
      id: 2,
      title: 'Post 2',
      datetime: '2nd Jan 2025, 2 PM',
      body: 'Im learned Wordpress Last week'
    },
    {
      id: 3,
      title: 'Post 3',
      datetime: '2nd Jan 2025, 2 PM',
      body: 'Once I complete React Video will do a admin panel project'
    }
  ])

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle,setPostTitle] = useState();
  const [postBody,setPostBody] = useState();

  useEffect(() => {
    const filteredResults = posts.filter((post) => 
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const NewPost = {id, title: postTitle, datetime, body: postBody};
    const allPosts = [...posts,NewPost];
    setPosts(allPosts)
    setPostTitle('');
    setPostBody('');
  }

  return (
    <div className='App'>
      <Header title = "Networking with Nivi :)"/>
      <Nav 
      search={search}
      setSearch={setSearch}/>
      <Home 
      posts={searchResults}
      />
      <NewPost 
      postTitle = {postTitle}
      setPostTitle={setPostTitle}
      postBody={postBody}
      setPostBody={setPostBody}
      handleSubmit={handleSubmit}/>
      <PostPage/>
      <About/>
      <Missing/>
      <Footer/>
    </div>
  )
}

export default App