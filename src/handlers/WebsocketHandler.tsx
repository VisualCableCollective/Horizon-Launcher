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
            authEndpoint: Config.websocketAuthEndpoint,
        });
        this.echoHandler.connect();
        setTimeout(() => {
            this.echoHandler.private("client.23").listen("login", (e: any) => {
                console.log("got event: " + e.message);
            })
        }, 1000);
        this.initDone = true;
    }

    /* HOW TO LISTEN FOR EVENTS
    The event has to be prefixed with a '.'.
    The data for this example was '{"message": "test"}'.

    this.echoHandler.channel("Test").listen('.OrderShipmentStatusUpdated', (e: any) => {
            console.log("got event: " + e.message);
        });
    */
}

export default WebsocketHandler;