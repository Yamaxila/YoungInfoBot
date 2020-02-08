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
    name: "getevent",
    type: "command"
};

exports.preload = function () {
    // command preload
};

exports.exec = (api, message) => {

    let user_id = message.from.id;

    api.sendMessage({
        chat_id: message.chat.id,
        text: "<b>Выберите день</b> \n\nВыберите интерисующий вас день и бот отправит вам все мероприятия на которые можно пойти",
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Сегодня', callback_data: -1 }],
                [{ text: 'Завтра', callback_data: 0 }],
                [{ text: 'Понедельник', callback_data: 1 }],
                [{ text: 'Вторник', callback_data: 2 }],
                [{ text: 'Среда', callback_data: 3 }],
                [{ text: 'Четверг', callback_data: 4 }],
                [{ text: 'Пятница', callback_data: 5 }],
                [{ text: 'Суббота', callback_data: 6 }],
                [{ text: 'Воскресенье', callback_data: 7 }]
            ]
        }),
        parse_mode: "HTML"
    }).then(c => {
        // console.log(c);
    }).catch(e => {
        console.log(e);
    });
};