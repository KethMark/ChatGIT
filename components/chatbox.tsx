"use client"
import React from 'react'
import { useChat } from 'ai/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Chatbox = () => {

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/web'
    })
    

  return (
    <div>

        {messages.map((m, index) => (
          <li key={index}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}

        <form onSubmit={handleSubmit}>
            <Input value={input} onChange={handleInputChange}/>
            <Button type='submit'>Submit</Button>
        </form>
    </div>
  )
}