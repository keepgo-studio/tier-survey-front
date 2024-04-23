import React from 'react'

export default function Text({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <div className='w-fit group relative pb-[2px]'>
      {children}
      <div className='absolute bottom-0 left-0 w-0 h-[1px] bg-prime-white duration-150 group-hover:w-full' />
    </div>
  )
}
