const axios = require('axios').default
;
const url = process.env.CHAT_SERVICE_URL
console.log(`${url}token`)
async function getStreamToken(user_uuid){
    try {
        const response = await axios.post(`${url}chat/token`, {
            user_uuid
        })
        console.log(response, " token")
        return response?.data?.streamToken
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getStreamToken}