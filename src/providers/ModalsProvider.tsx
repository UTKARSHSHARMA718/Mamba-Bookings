import React from 'react'

import LoginModal from '@/containers/LoginModal/LoginModal'
import RegisterModal from '@/containers/RegisterModal/RegisterModal'
import RentModal from '@/containers/RentModal/RentModal'
import ReviewModal from '@/components/ReviewModal/ReviewModal'
import SearchModal from '@/containers/SearchModal/SearchModal'

const ModalsProvider = () => {

  return (
    <>
      <RentModal />
      <RegisterModal />
      <LoginModal />
      <SearchModal />
      <ReviewModal />
    </>
  )
}

export default ModalsProvider;