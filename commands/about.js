/*
*
*   YoungInfoBot
*
*   Writen on "Teen Hack 2020"
*
*   by Yamaxila and his team.
*   (all peoples here)
*
*/

let index = require('../index');

exports.config = {
    name: "about",
    type: "command"
};

exports.preload = function () {
    // command preload
};

exports.exec = (api, message) => {


    api.sendMessage({
        chat_id: message.chat.id,
        text: "<b>О боте и... Немного о создателях</b> \n\nБот создан для людей, которые приезжают в г. Витебск или для тех, кто не знает куда пойти в нашем городе.  " +
            "\n\n<b>Создатели:</b>\n\n" +
            "  🔸️ <b>Алина</b> - помошник дизайнера \n" +
            "  🔸️ <b>Яна</b> - дизайнер\n" +
            "  🔸️ <b>Оля</b> - сценарии\n" +
            "  🔸 <b>Илона</b> - менедреж проекта\n" +
            "  🔸️ <b>Влад(Yamaxila)</b> - тех. специалист/куратор",
        parse_mode: "HTML"
    }).then(c => {
        // console.log(c);
    }).catch(e => {
        console.log(e);
    });

};
