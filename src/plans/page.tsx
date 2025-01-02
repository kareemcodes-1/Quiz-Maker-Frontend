
import Layout from '../layout'
import AllPlans from '../components/all-plans'
import { PlusIcon } from '@heroicons/react/24/outline'

const Plans = () => {
  return (
    <Layout>
          <div className='flex items-center justify-between w-full mb-[1.5rem]'>
               <h1 className='text-[3rem]'>Plans</h1>
               <a href='/plans/new' className='yena-btn'><span className='lg:block hidden'>Create Plan</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></a>
          </div>

          <AllPlans />
    </Layout>
  )
}

export default Plans