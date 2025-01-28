import { useEffect, useState } from "react"
import { addChatId } from "./ChatSlice"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage,receiveNotifications } from "../app/query";

export default function Chat(){
    const [chatState,setChatState] = useState(false)
    const [chatId,setChatId] = useState('')

    const dispatch = useDispatch();
    const chatList = useSelector(state=>state.chat.chatList);

    const [chatFocus,setChatFocus] = useState({chatId:'',messageList:[]})
    const [message,setMessage] = useState('')

    const idInstance = useSelector(state=>state.auth.idInstance)
    const apiTokenInstance = useSelector(state=>state.auth.apiTokenInstance)

    const addChat = (chatList,newchat) => {
        dispatch(addChatId(
            {
                chat:[...chatList,
                    {chatId:newchat + "@c.us",messageList:[]}]
            }
        ))
        setChatState(false)
    }

    const addFocusChat = (value) => {
        setChatFocus(value)
    }

    const sendMessageClick = async(idInstance,apiTokenInstance,chatFocus,message) => {
        //отправка 
        var idMessage = await sendMessage(idInstance,apiTokenInstance,chatFocus.chatId,message).then(value=>value)
        
        //эммутация списка сообщений
        var newMessageList = [{role:'self',message:message,idMessage:idMessage},...chatList.find(chat => chat.chatId === chatFocus.chatId).messageList]

        //удаление старый записи
        var newChatlist = chatList.filter(chat=> chat.chatId !== chatFocus.chatId)

        //соединение и сохранение        
        dispatch(addChatId({
            chat:[...newChatlist,{chatId:chatFocus.chatId,messageList:newMessageList}]
        }))

        setMessage('')
    }

    const receiveNotificationFunc = async(idInstance,apiTokenInstance,chatList) => {
        var newchat = await receiveNotifications(idInstance,apiTokenInstance,chatList)
        dispatch(addChatId({
            chat:newchat
        }))
    }

    useEffect(()=>{receiveNotificationFunc(idInstance,apiTokenInstance,chatList)},{});

    return(
        <div className="chat_container">
            <div className="chat_list">
                <header>
                    <div className="chat-header">
                        <h2>Чаты</h2>
                        <button onClick={()=>setChatState(true)}>
                        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" fill="none"><title>Создать новый чат</title><path d="M9.53277 12.9911H11.5086V14.9671C11.5086 15.3999 11.7634 15.8175 12.1762 15.9488C12.8608 16.1661 13.4909 15.6613 13.4909 15.009V12.9911H15.4672C15.9005 12.9911 16.3181 12.7358 16.449 12.3226C16.6659 11.6381 16.1606 11.0089 15.5086 11.0089H13.4909V9.03332C13.4909 8.60007 13.2361 8.18252 12.8233 8.05119C12.1391 7.83391 11.5086 8.33872 11.5086 8.991V11.0089H9.49088C8.83941 11.0089 8.33411 11.6381 8.55097 12.3226C8.68144 12.7358 9.09947 12.9911 9.53277 12.9911Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M0.944298 5.52617L2.99998 8.84848V17.3333C2.99998 18.8061 4.19389 20 5.66665 20H19.3333C20.8061 20 22 18.8061 22 17.3333V6.66667C22 5.19391 20.8061 4 19.3333 4H1.79468C1.01126 4 0.532088 4.85997 0.944298 5.52617ZM4.99998 8.27977V17.3333C4.99998 17.7015 5.29845 18 5.66665 18H19.3333C19.7015 18 20 17.7015 20 17.3333V6.66667C20 6.29848 19.7015 6 19.3333 6H3.58937L4.99998 8.27977Z" fill="currentColor"></path></svg>
                        </button>
                    </div>
                    {
                        chatState ? <div className="module_">
                            <div className="module_page">
                                <input className="module_input" type="text" placeholder="chatId..." onChange={(e)=>setChatId(e.target.value)}/>
                                <div className="module_action">
                                    <button onClick={()=>addChat(chatList,chatId)}>Добавить</button>
                                    <button onClick={()=>setChatState(false)}>Закрыть</button>
                                </div>
                            </div>
                            </div> : ""
                    }
                    <ul className="chat_list_container">
                        {
                            chatList.length == 0 ? '' : chatList.map(
                                (value,index) => 
                                <li key={index} onClick={()=>addFocusChat(value)}> 
                                    <h4>{value.chatId}</h4> 
                                    <span>{!value.messageList[0] ? 'Пока нет сообщений': value.messageList[0].message}</span>
                                </li>
                            )
                        }
                    </ul>
                </header>
            </div>
            <div className="chat">
                {
                    !chatFocus.chatId ? <div className="empty_chat_focus">Выберите чат или добавьте новый чат</div> : 
                    <div className="full_chat_focus">
                        <div className="message_list">
                            {
                                [...chatList.find(chat => chat.chatId == chatFocus.chatId).messageList].reverse().map((value,index)=>
                                    <div key={index} className={value.role == "self"? 'right':'left'}>{value.message}</div>
                                )
                            }
                        </div>
                        <div className="message_action">
                            <input className="message_input" placeholder="Message..." type="text" onChange={(e)=>setMessage(e.target.value)} defaultValue={message}/>
                            <button className="message_submit" onClick={()=>sendMessageClick(idInstance,apiTokenInstance,chatFocus,message)}><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>send</title><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg></button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}