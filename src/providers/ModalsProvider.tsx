import React from 'react'

import LoginModal from '@/containers/LoginModal/LoginModal'
import RegisterModal from '@/containers/RegisterModal/RegisterModal'
import RentModal from '@/containers/RentModal/RentModal'
import SearchModal from '@/containers/SearchModal/SearchModal'

const ModalsProvider = () => {

  return (
    <>
      <RentModal />
      <RegisterModal />
      <LoginModal />
      <SearchModal />
    </>
  )
}

export default ModalsProvider;