
import { DocumentData } from 'firebase/firestore'

type Props = {
    message: DocumentData
}

export default function MessageBuble ({message}: Props){

    const isChat = message.role != 'user'
    return (
        <div className={`py-5 text-white ${isChat && "bg-[#434654]"}`}>
            <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
                {/* {JSON.stringify(message)} */}
                {!isChat ?
                 (<img 
                    className='h-8 w-8'
                    src={message.user.avatar} 
                    alt="avatar" />)
                 : (<></>) 

                }

                <p className='pt-1 text-sm'>
                    {message.content}
                </p>
            </div>
        </div>
    )
}