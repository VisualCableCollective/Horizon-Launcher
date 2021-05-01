import Config from "../Config";

import Echo from "laravel-echo";
const Pusher = require('pusher-js');

class WebsocketHandler {
    static echoHandler: Echo;
    static initDone: boolean = false;
    static Init() {
        if(this.initDone){
            return;
        }
        this.echoHandler = new Echo({
            broadcaster: 'pusher',
            key: Config.pusherKey,
            wsHost: Config.websocketHost,
            wsPort: Config.websocketPort,
            forceTLS: false,
            disableStats: true,
        });
        this.echoHandler.connect();

        this.initDone = true;
    }
}

export default WebsocketHandler;