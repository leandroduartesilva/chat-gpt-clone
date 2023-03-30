import { SunIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='text-white flex flex-col items-center justify-center h-screen px-2'>
      <h1 className='text-5xl font-bold mb-20'>ChatGPT Clone</h1>

      <div className='flex space-x-2 text-center'>
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <SunIcon className='h-8 w-8'/>
            <h2>Examples</h2>

            <div className='space-y-2'>
              <p className='infoText'>"Explain something to me</p>
              <p className='infoText'>"What is the difference between a dog and a cat?"</p>
              <p className='infoText'>"What is teh color of the sun?"</p>
            </div>
          </div>
        </div>

        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <BoltIcon className='h-8 w-8'/>
            <h2>Capabilities</h2>

            <div className='space-y-2'>
              <p className='infoText'>"Explain something to me</p>
              <p className='infoText'>"What is the difference between a dog and a cat?"</p>
              <p className='infoText'>"What is teh color of the sun?"</p>
            </div>
          </div>
        </div>

        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <ExclamationTriangleIcon className='h-8 w-8'/>
            <h2>Limitations</h2>

            <div className='space-y-2'>
              <p className='infoText'>"Explain something to me</p>
              <p className='infoText'>"What is the difference between a dog and a cat?"</p>
              <p className='infoText'>"What is teh color of the sun?"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <main className='bg-slate-700'>
    //   <h1 className='text-blue-300'>Chat GPT Clone</h1>
    // </main>
  )
}
