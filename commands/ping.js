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
	name: "ping",
  type: "command"
};

exports.preload = function () {
  // command preload
};

exports.exec = (api, message) => {


  api.sendMessage({
    chat_id: message.chat.id,
    text: "pong!"
  }).then(c => {
    // console.log(c);
  }).catch(e => {
    console.log(e);
  });

};
