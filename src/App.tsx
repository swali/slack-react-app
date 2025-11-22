import React, { useState, useEffect, type KeyboardEvent } from 'react'
import './App.css'

interface Message {
  id: string
  text: string
  user: {
    name: string
    avatarUrl: string
  }
}

const initialPosts: Message[] = [
  {
    id: '1',
    text: "Post 1 content",
    user: {
      name: 'Sandeep',
      avatarUrl: 'https://images.pexels.com/photos/15099919/pexels-photo-15099919.jpeg'
    }
  },
  {
    id: '2',
    text: "Post 2 content",
    user: {
      name: 'Rashna',
      avatarUrl: 'https://images.pexels.com/photos/15099919/pexels-photo-15099919.jpeg'
    }
  },
]

function App() {
  const [posts, setPosts] = useState(initialPosts)
  const [newMessage, setNewMessage] = useState('')
  const [editingId, setEditingId] = useState('')
  const [editingText, setEditingText] = useState('')

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
        id: 'temp',
        text: newMessage,
        user: {
          name: '',
          avatarUrl: 'https://images.pexels.com/photos/15099919/pexels-photo-15099919.jpeg'
        },
      }
      setPosts((prevPosts) => ([...prevPosts, newPost]))
      setNewMessage('');
    }
  }

  const onEditClick = (post: Message) => {
    setEditingId(post.id)
    setEditingText(post.text)
  }

  const onSaveClick = () => {
    setPosts((prevPosts) => (
      prevPosts.map((post) => {
        if (post.id === editingId) {
          return {...post, text: editingText};
        }

        return post;
      })
    ))
    setEditingId('')
  }

  return (
    <div className="app">
      <h1 className="header">Slack</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li className="post">
            <img className="poster-image" src={post.user.avatarUrl} />
            <div className="poster-and-content">
              <p className="post-author">{post.user.name}</p>
              {editingId === post.id ? 
                (<p>
                  <input value={editingText}
                    onChange={e => setEditingText(e.currentTarget.value)} />
                  <button type="button" onClick={onSaveClick}>Save</button>
                </p>) :
                (<p className="post-content">
                  <span>{post.text}</span>
                  <button type="button" onClick={() => onEditClick(post)}>Edit</button>
                </p>)
              }
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
