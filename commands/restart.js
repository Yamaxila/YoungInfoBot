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
    name: "restart",
    type: "command"
};

exports.preload = function () {
    // command preload
};

exports.exec = (api, message) => {
    index.commands.get('start').exec(api, message)
};
