const { model, Schema } = require('mongoose');

const TicketSchema = model('transcript', 
    new Schema({
        Channel: String,
        Content: Array,
        Author: String
    })
)


module.exports = TicketSchema