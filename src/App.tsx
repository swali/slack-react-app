import React, { useState, useEffect, type KeyboardEvent } from 'react'
import './App.css'

interface Message {
  id?: string
  text: string
  user: {
    name: string
    avatarUrl: string
  }
}

const initialPosts: Message[] = [
  {
    text: "Post 1 content",
    user: {
      name: 'Sandeep',
      avatarUrl: ''
    }
  },
  {
    text: "Post 2 content",
    user: {
      name: 'Rashna',
      avatarUrl: ''
    }
  },
]

function App() {
  const [posts, setPosts] = useState(initialPosts)
  const [newMessage, setNewMessage] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('blah.com')
        const data = await response.json()
        setPosts(data)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setPosts(initialPosts)
      }
    }

    fetchData()
  }, [])

  const onNewMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.currentTarget.value)
  }

  const onNewMessageKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newPost: Message = {
        text: newMessage,
        user: {
          name: '',
          avatarUrl: ''
        },
      }
      setPosts((prevPosts) => ([...prevPosts, newPost]))
      setNewMessage('');
    }
  }

  return (
    <div className="app">
      <h1 className="header">Slack</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li className="post">
            <img src={post.user.avatarUrl} />
            <div className="poster-and-content">
              <p className="post-author">{post.user.name}</p>
              <p className="post-content">{post.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <input type="text" placeholder="Enter message" value={newMessage}
        onInput={onNewMessageInput}
        onKeyDown={onNewMessageKeyDown} />
    </div>
  )
}

export default App
