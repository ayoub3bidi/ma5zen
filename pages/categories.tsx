import { useSession } from 'next-auth/react';
import React from 'react'
import { CustomNextPage } from '../types/CustomNextPage'

const categories:CustomNextPage = () => {
  return (
    <div>What are you doing here bro ?</div>
  )
}

export default categories;
categories.requireAuth = true;