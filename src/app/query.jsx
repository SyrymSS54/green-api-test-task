import whatsAppClient from '@green-api/whatsapp-api-client';

export const sendMessage = async(idInstance,apiTokenInstance,chat,message) => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance,
        apiTokenInstance
    }))
    try {
        const response = await restAPI.message.sendMessage(chat, null,message);
        console.log(response.idMessage)
        return response.idMessage
    } catch (ex) {
        console.error(ex);
    }
}

export const receiveNotifications = async(idInstance,apiTokenInstance,chatList) => {
    let restAPI = whatsAppClient.restAPI(({
        idInstance,
        apiTokenInstance
    }))

    try {

        console.log("Waiting incoming notifications...")
        let response
        while (response = await restAPI.webhookService.receiveNotification()) {
            let webhookBody = response.body;
            if (webhookBody.typeWebhook === 'incomingMessageReceived') {
                console.log('incomingMessageReceived')
                console.log(webhookBody.messageData.textMessageData.textMessage)

                if(webhookBody.messageData.typeMessage == "textMessage"){
                    
                    var idMessage = webhookBody.idMessage
                    var message = webhookBody.messageData.textMessageData.textMessage
                    var role = "others"
                    var chatId = webhookBody.senderData.chatId

                    var newMessageList = [{role:role,message:message,idMessage:idMessage},...chatList.find(chat => chat.chatId === chatId).messageList]
                    var newChatlist = chatList.filter(chat=> chat.chatId !== chatFocus.chatId)

                    await restAPI.webhookService.deleteNotification(response.receiptId);

                    return [...newChatlist,{chatId:chatFocus.chatId,messageList:newMessageList}]

                }
            } 
        }
    } catch (ex) {
        console.error(ex)
    }

    console.log("End")

}

