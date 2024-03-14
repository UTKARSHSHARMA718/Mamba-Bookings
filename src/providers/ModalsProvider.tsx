import React from 'react'

import LoginModal from '@/containers/LoginModal/LoginModal'
import RegisterModal from '@/containers/RegisterModal/RegisterModal'
import RentModal from '@/containers/RentModal/RentModal'

const ModalsProvider = () => {

  return (
    <>
      <RentModal />
      <RegisterModal />
      <LoginModal />
    </>
  )
}

export default ModalsProvider;