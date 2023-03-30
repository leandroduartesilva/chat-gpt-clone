import '../styles/globals.css'
import SideBar from '../components/Sidebar';
import { getServerSession } from 'next-auth'
import { SessionProvider } from '../components/SessionProvider'
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Login from '@/components/Login';
import ClientProvider from '@/components/ClientProvider';

export const metadata = {
  title: 'ChatGPT Clone',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ): (

            <div className='flex'>
              <div className='bg-[#282123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]'>
                {/* sidebar */}
                <SideBar />
              </div>

              {/* ClientProvider - notifications */}
              <ClientProvider />

              <div className='bg-[#343541] flex-1'>
              {children}
              </div>
            </div>

          )}
        </SessionProvider>
      </body>
    </html>
  )
}
