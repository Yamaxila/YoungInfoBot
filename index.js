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



exports.modules = new Map();
exports.commands = new Map();
exports.user_news_state = new Map();
exports.messages_state = new Map();

//States migrated to buttons, but...
//I want to save this lines in index file :)
exports.state_news0 = 0;
exports.state_news1 = 1;
exports.state_news2 = 2;
exports.state_news3 = 3;



let loader = require('./loader');
let config = require('./config.json');
let telegram = require('telegram-bot-api');
const mysql = require("mysql2");

const mysql_conn = mysql.createConnection({
    host: config['mysql_host'],
    user: config['mysql_user'],
    database: config['mysql_db'],
    password: config['mysql_pass']
});

let api = new telegram({
    token: config['api_key'],
    updates: {
        enabled: true,
        get_interval: 1
    }
});

exports.mysql_conn = mysql_conn;


//FIXME: need to add listeners api in modules?
api.on('inline.callback.query', function onCallbackQuery(msg) {

    if(msg.data === 'select_fact') {
        exports.commands.get('getrandomfact').exec(api, msg.message);
        api.deleteMessage({chat_id: msg.message['chat'].id, message_id: msg.message.message_id});
    } else if(msg.data === 'afisha') {
        exports.commands.get('getevent').exec(api, msg.message);
        api.deleteMessage({chat_id: msg.message['chat'].id, message_id: msg.message.message_id});
    } else if(msg.data === 'about') {
        exports.commands.get('about').exec(api, msg.message);
        api.deleteMessage({chat_id: msg.message['chat'].id, message_id: msg.message.message_id});
    } else if(msg.data === 'fact_no') {
        api.deleteMessage({chat_id: msg.message['chat'].id, message_id: msg.message.message_id});
    } else if(msg.data === 'fact_yes') {
        api.deleteMessage({chat_id: msg.message['chat'].id, message_id: msg.message.message_id});
    } else if(msg.data === 'fact_back') {
        api.deleteMessage({chat_id: msg.message['chat'].id, message_id: msg.message.message_id});
    } else if(msg.data === 'new_fact') {
        exports.commands.get('getrandomfact').exec(api, msg.message);
        api.deleteMessage({chat_id: msg.message['chat'].id, message_id: msg.message.message_id});
    } else if(msg.data === 'back'){
        exports.commands.get('getevent').exec(api, msg.message);
        api.deleteMessage({chat_id: msg.message['chat'].id, message_id: msg.message.message_id});
    } else {


        let date_now = new Date();

        let month = date_now.getMonth() + 1;

        let curr_date = date_now.getDate();

        let date_day = date_now.getDay();

        let eDate = 7 - date_day + parseInt(msg.data) + curr_date;


        if (eDate > 31) {
            eDate = eDate - 31;
            month = month + 1;
        }

        // console.log(`${eDate}.0${month}`);

        mysql_conn.query(`select * FROM \`db_news\` WHERE date = '${eDate}.0${month}' `, function (e, r, f) {

            api.deleteMessage({chat_id: msg.message['chat'].id, message_id: msg.message.message_id});

            if (r.length === 0) {
                api.sendMessage({
                    text: `\n<b>Ничего не найдено!</b> \n\nИзвините, но в данный день мероприятия не найдены или на данный момент у нас информации о них.\n\n <b>Выбранная дата: ${eDate}.0${month}.2020</b>`,
                    chat_id: msg.message['chat'].id,
                    message_id: msg.message.message_id,
                    parse_mode: "HTML",
                    reply_markup: JSON.stringify({
                        inline_keyboard: [[{text: '↩️ Назад ️', callback_data: 'back'}]]
                    })
                });

            } else
                for (let i = 0; i < r.length; i++) {
                    if(i === r.length-1)
                        api.sendMessage({
                            text: `\n<b>${r[i]['title']}</b> \n\n${r[i]['desc']} \n\n<a href="${r[i]['url']}">Афиша</a>\n\n<b>Дата проведения: ${r[i]['date']}.2020</b>`,
                            chat_id: msg.message['chat'].id,
                            message_id: msg.message.message_id,
                            parse_mode: "HTML",
                            reply_markup: JSON.stringify({
                                inline_keyboard: [[{text: '↩️ Назад ️', callback_data: 'back'}]]
                            })
                        });
                    else
                        api.sendMessage({
                            text: `\n<b>${r[i]['title']}</b> \n\n${r[i]['desc']} \n\n<a href="${r[i]['url']}">Афиша</a>\n\n<b>Дата проведения: ${r[i]['date']}.2020</b>`,
                            chat_id: msg.message['chat'].id,
                            message_id: msg.message.message_id,
                            parse_mode: "HTML"
                        });
                }
        });

        // api.editMessageText( {text: `${}`, chat_id: msg.message['chat'].id, message_id: msg.message.message_id});

    }
});

api.on('message', function(message)
{
    if(message && message.text) {
        if (message.from.id !== 998894915) {
            if(message.text.includes("/") && message.text.includes("@")){
                if(exports.commands.get(message.text.split("@")[0].split("/")[1].toLowerCase()))
                    exports.commands.get(message.text.split("@")[0].split("/")[1].toLowerCase()).exec(api, message);
                else
                    sendError(message);
            } else if (message.text.includes("/") && message.text.split(" ")) {
                if(exports.commands.get(message.text.split(" ")[0].split("/")[1].toLowerCase()))
                    exports.commands.get(message.text.split(" ")[0].split("/")[1].toLowerCase()).exec(api, message);
                else
                    sendError(message);
            } else if(message.text.include("/")){
                if(exports.commands.get(message.text.split("/")[1].toLowerCase()))
                    exports.commands.get(message.text.split("/")[1].toLowerCase()).exec(api, message);
                else
                    sendError(message);
            }
        }
    }
});

function sendError(msg){
    api.sendMessage({
        chat_id: msg.chat.id,
        text: "<b>Ошибка!</b>\nКоманда не найдена!",
        parse_mode: "HTML"
    }).then(c => {

    }).catch(e => {
        console.log(e);
    });
}

setTimeout(loadModules, 3000);

async function loadModules() {

    exports.modules.forEach((item, i) => {
        if(item.config['type'] === 'module'){
            if(item.exec)
                item.exec(api);
        }

    });
}