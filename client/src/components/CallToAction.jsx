import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      
      <div className="flex-1  justify-center flex-col ">
      <h2 className='text-2xl'>Want to learn more about javaScript?</h2>
      <p className='text-gray-500 my-2'>Checkout these resources with Javasript projects</p>
      <Button gradientDuoTone={'purpleToPink'} className='rounded-tl-xl rounded-bl-none w-full' >
        <a href="https://github.com/abhishekSonawane97" target="_blank" rel='noopener noreferrer'>Project Source code</a>
      </Button>
      </div>
      <div className="p-7 flex-1 w-full">
        <img className='objec-cover w-full' src="https://tse2.mm.bing.net/th?id=OIP.AuSJetXrmIb6SufLZQalvwHaHa&pid=Api&P=0&h=220" />
      </div>
    </div>
  )
}

export default CallToAction
