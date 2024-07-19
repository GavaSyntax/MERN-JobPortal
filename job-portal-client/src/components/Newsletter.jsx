import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6"
const Newsletter = () => {
  return (
    <div>
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <FaEnvelopeOpenText/>
            Email me for jobs</h3>
            <p className='text-primary/75 text-base mb-4'> Looking for employment opportunities? Reach out via email to connect with potential job openings and career advice. Let's find the right job for you!</p>
      </div>
      <div className='w-full space-y-4'>
         <input type="émail" name="email" id="email" placeholder="name@mailme.com" className='w-full block py-2 pl-3 border focus:outline-none'/>
         <input type="submit" value={"Subscribe"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'/>
      </div>
     {/******* */}
      <div className="mt-20">
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
            <FaRocket/>
            Get noticed faster</h3>
            <p className='text-primary/75 text-base mb-4'>
            Boost your visibility and attract employers quickly with our job website. Optimize your profile, showcase your skills, and land your dream job faster.</p>
      </div>
      <div className='w-full space-y-4'>
         
         <input type="submit" value={"Upload your resume"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'/>
      </div>
    </div>
  )
}

export default Newsletter
