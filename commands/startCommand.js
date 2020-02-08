/*
*
*   YoungInfoBot
*
*   Writen on "Teen Hack 2020"
*
*   by Yamaxila and his team.
*   (all peoples in about.js)
*
*/


let index = require('../index');

exports.config = {
    name: "start",
    type: "command"
};

exports.preload = function () {
    // command preload
};

exports.exec = (api, message) => {

    api.sendMessage({
        chat_id: message.chat.id,
        text: "<b>Меню</b>\n\nНапишите команду через / или выберите её из списка.",
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Случайный факт', callback_data: 'select_fact' }],
                [{ text: 'Афиша', callback_data: 'afisha' }],
                [{ text: 'О боте', callback_data: 'about' }]
            ]}),
        parse_mode: "HTML"
    }).then(c => {
        // console.log(c);
    }).catch(e => {
        console.log(e);
    });

};
