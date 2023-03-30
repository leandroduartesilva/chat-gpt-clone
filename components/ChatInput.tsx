'use client'

import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react';
import { serverTimestamp, addDoc, collection, query, orderBy } from 'firebase/firestore';
import { db } from "@/firebase";
import toast from 'react-hot-toast';
import { useCollection } from 'react-firebase-hooks/firestore';

type Props = {
    chatId: string
}

type ChatsProps = {
    role: string,
    content: string
}

function ChatInput({chatId}: Props){

    const {data: session} = useSession()
    const [prompt, setPrompt] = useState('')
    //const [chats, setChats] = useState<ChatsProps[]>()

    // useSWR to get model
    const model = "text-davinci-003"

    const [messagesChats] = useCollection(session &&
        query(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            orderBy('createdAt', 'asc')
        )
    )

    const updateMessage = async (message: Message) => {
        await addDoc(
            collection(
                db,
                'users',
                session?.user?.email!,
                'chats',
                chatId,
                'messages'
            ),
            message)
    }

    const getChats = (input: string) => {

        const arrayRetorno: ChatsProps[] = []
        messagesChats?.docs.forEach(
            doc => {
                const jsonDoc = {
                    role: doc.data().role,
                    content: doc.data().content
                }

                arrayRetorno.push(jsonDoc)
            }
        )
        // console.log("push", "fazendo push")
        // console.log("pushInput", input)
        const jsonDoc = {role: "user", content: input}
        // console.log("pushJsoonDoc", jsonDoc)
        arrayRetorno.push(jsonDoc)
        // console.log("arrayRetorno", arrayRetorno)
        // console.log("push", "push feito")
        return arrayRetorno

    }

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return

        const input = prompt.trim()
        setPrompt('')

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || ''
            },
            role: 'user',
            content: input
        }

        await addDoc(
            collection(
                db,
                'users',
                message.user._id,
                'chats',
                chatId,
                'messages'
            ),
            message
        )

        // Toast notification to say loading
        const notification = toast.loading("Pensando...")

        const arrayChats = getChats(input);

        //console.log("chats", chats)
        await fetch('http://localhost:5000/api/chats', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                    chats: 
                        // {role: "system", content: "finja que voce é um jogador de futebol"},
                        // {role: "user", content: input}
                        arrayChats

            })
        }).then(
            (res) => {
                const retorno = res.json();
                retorno.then(
                    (r) => {
                        //console.log(r.dataComplete[0].message.role)
                        message.role = r.dataComplete[0].message.role
                        message.content = r.dataComplete[0].message.content
                        updateMessage(message)
                    }
                )

                toast.success('Respondido!', {
                            id: notification
                        })
            }

        )

        // await fetch('http://localhost:5000/api/chat', {
        //     method: 'POST',
        //     headers: { 
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //             prompt: input,
        //             role: "agente de futebol"
        //     })
        // }).then(
        //     (res) => {
        //         const retorno = res.json();
        //         retorno.then(
        //             (r) => {
        //                 //console.log(r.dataComplete[0].message.role)
        //                 message.role = r.dataComplete[0].message.role
        //                 message.content = r.dataComplete[0].message.content
        //                 updateMessage(message)
        //             }
        //         )

        //         toast.success('Respondido!', {
        //                     id: notification
        //                 })
        //     }

        // )

        // await fetch('/api/askQuestion', {
        //     method: 'POST',
        //     headers: { 
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         prompt: input, chatId, model, session
        //     })
        // }).then(() => {
        //     // toast notification to say successful
        //     toast.success('Respondido!', {
        //         id: notification
        //     })
        // })
    }

    return (
        <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm'>
            <form 
                onSubmit={sendMessage}
                className="p-5 space-x-5 flex">
                <input
                    className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed
                        disabled:text-gray-300'
                    value={prompt}
                    onChange={(e)=> setPrompt(e.target.value)}
                    type="text" 
                    placeholder="Digite o comando..."
                    disabled={!session}
                />

                <button className='bg-[#11A37F] hover:opacity-50 text-white font-bold
                         px-4 py-2 rounded disabled:text-gray-500 disabled:bg-gray-300/50
                         disabled:cursor-not-allowed'
                    type='submit'
                    disabled={!prompt || !session}>
                    <PaperAirplaneIcon className='h-4 w-4 -rotate-45'/>
                </button>
            </form>

            <div>
                {/* modelSelection */}
            </div>
        </div>
    )
}

export default ChatInput