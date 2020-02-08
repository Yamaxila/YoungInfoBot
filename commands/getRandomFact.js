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
    name: "getrandomfact",
    type: "command"
};

exports.preload = function () {
    // command preload
};

exports.exec = (api, message) => {

index.mysql_conn.query(`SELECT * FROM db_facts ORDER BY RAND() LIMIT 1`, function (e, r, f) {

    if(r.length === 0){
        api.sendMessage({
            text: `\n<b>Ничего не найдено!</b> \n\nИзвините, произошла ошибка. Попробуйте позже.`,
            chat_id: msg.message['chat'].id,
            message_id: msg.message.message_id,
            parse_mode: "HTML",
            reply_markup: JSON.stringify({
                inline_keyboard: [[{text: 'Закрыть ️', callback_data: 'fact_back'}]]
            })
        });
    } else

    api.sendMessage({
        chat_id: message.chat.id,
        text: `<b>🎲Случайный факт🎲</b> \n\n ${r[0]['text']} \n\nА вы знали?` ,
        parse_mode: "HTML",
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Да', callback_data: 'fact_yes' }],
                [{ text: 'Нет', callback_data: 'fact_no' }],
                [{ text: 'Ещё один факт!', callback_data: 'new_fact' }]
            ]})
    }).then(c => {

    }).catch(e => {
        console.log(e);
    });

})


};
