import React from 'react'
import Image from 'next/image'
import BackButton from '@/components/BackButton'

const page = () => {
  return (
    <>
    <BackButton />
    <div className='flex flex-col h-[80vh] justify-center items-center gap-8'>
    <Image src="/assets/images/load.gif" alt="Loading" width="100" height="100" />
    <div className='flex flex-col justify-center items-center gap-1 text-secondary font-semibold '>
        <span className='text-lg'>당신의 마음이 전달되고 있습니다.</span>
        <span className='text-md'>잠시만 기다려주세요.</span>
    </div>
    </div>
    </>
  )
}

export default page