'use client'

import { db } from '@/firebase';
import NewChat from './Newchat';
import { useSession, signIn, signOut } from "next-auth/react"
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import ChatRow from './ChatRow';

function SideBar() {

    const { data: session } = useSession()

    const [chats, loading, error] = useCollection(
        session && query(collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createdAt', 'asc')
    ))

    return (
        <div className="flex p-2 flex-col h-screen">
            <div className="flex-1">
                <div>
                    {/* NewChat */}
                    <NewChat />
                    <div>
                        {/* ModelSelection */}
                    </div>

                    {/* Map for chatRows */}
                    {chats?.docs.map( chat => (
                        <ChatRow key={chat.id} id={chat.id} />
                    ))}
                </div>
            </div>

            {session && (
                <img 
                    onClick={() => signOut()}
                    className='h-14 w-14 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50' 
                    src={session.user?.image!} 
                    alt="avatar" />
            )}
        </div>
    )
}

export default SideBar