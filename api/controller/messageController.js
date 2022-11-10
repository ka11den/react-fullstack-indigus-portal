import Message from "../models/Message.js"

export const sendMessage = async (req, res, next) => {
    try {
        const {from, to, message} = req.body
        const addMesage = await Message.create({
            message: {text: message},
            users: [from, to],
            sender: from,
        })
        if (addMesage) return res.json({msg: "Сообщение успешно отправлено!"})
        return res.json({msg: "Ошибка"})
    } catch (err) {
        next(err)
    }
}

export const getMessage = async (req, res, next) => {
    try {
        const {from, to} = req.body
        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({updatedAt: 1})

        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })

        res.json(projectMessages)
    } catch (err) {
        next(err)
    }
}