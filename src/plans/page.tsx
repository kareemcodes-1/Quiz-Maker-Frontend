import React from 'react'
import Layout from '../layout'
import AllPlans from '../components/all-plans'

const Plans = () => {
  return (
    <Layout>
          <div className='flex items-center justify-between w-full mb-[1.5rem]'>
               <h1 className='text-[3rem]'>Plans</h1>
               <a href='/plans/new' className='yena-btn'>Create new</a>
          </div>

          <AllPlans />
    </Layout>
  )
}

export default Plans