"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import React from 'react'
import Header from '@/components/header'; // import Header component
const Home = () => {
  return (
    <div>
        <Header/>
    </div>
  )
}

export default Home