"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Home = () => {
 
  return (
    <>
      <Link href={'/'}>Home</Link>
      <Link href={'/about'}>About</Link>
      <Link href={'/users'}>Users</Link>
    </>
  )
}

export default Home


