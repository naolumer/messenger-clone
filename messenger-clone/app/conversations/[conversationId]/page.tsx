interface Iparams {
    conversationId: string;
}

const ConversationId = async ({params}: {params:Iparams}) => {
    return (
        <div>
            conversatiod ID 
        </div>
    )
}

export default ConversationId;