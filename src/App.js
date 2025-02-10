import React, { use, useEffect, useState } from 'react'
import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router'
import Post from './Post'
import PostLayout from './PostLayout'
import { format } from 'date-fns'
import api from "./api/posts"

const App = () => {

  const [posts,setPosts] = useState([])

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle,setPostTitle] = useState();
  const [postBody,setPostBody] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchPosts = async () =>{
      try{
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch(err){
        if(err.response){
          //Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.message);
          console.log(err.response.status);
        } else{
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchPosts();
  },[])

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
    navigate('/')

  }

  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate('/')
  }

  return (
    <div className='App'>
      
      
      <Header title = "Networking with Nivi :)"/>
      <Nav 
      search={search}
      setSearch={setSearch}/>
      <Routes>

      <Route path='/' element={<Home 
      posts={searchResults}
      />}/>

      <Route path='post'>
          <Route index  element = {
            <NewPost 
            postTitle = {postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}/>} />
          <Route path=':id' element = {
            <PostPage 
            posts={posts} 
            handleDelete={handleDelete}/>}/>
      </Route>

      <Route path='about' element = {
      <About/>}/>

      <Route path='*' element = {
      <Missing/>}/>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App