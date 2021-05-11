import Config from "../Config";

import Log from "./Log";

import Echo from "laravel-echo";
import { resolve } from "node:path";
const Pusher = require('pusher-js');

class WebsocketHandler {
    static echoHandler: Echo;
    static initDone: boolean = false;
    static isConnected: boolean = false;
    static Init() {
        if (this.initDone) {
            return;
        }
        Log.silly("WebsocketHandler", "Starting...");
        this.echoHandler = new Echo({
            broadcaster: 'pusher',
            key: Config.pusherKey,
            wsHost: Config.websocketHost,
            wsPort: Config.websocketPort,
            forceTLS: false,
            disableStats: true,
            authEndpoint: Config.websocketAuthEndpoint,
        });

        // Configure echoHandler events
        this.echoHandler.connector.pusher.connection.bind('connected', () => {
            setTimeout(() => {
                Log.silly("WebsocketHandler", "Connected to the Horizon WS Server");
                Log.debug("WebsocketHandler", "Current WS ID: " + this.echoHandler.socketId());
                this.echoHandler.connector.pusher.config.auth.headers["X-Socket-ID"] = this.echoHandler.socketId();
                this.echoHandler.connector.pusher.config.auth.headers["Authorization"] = "Bearer 2|uUpNkiQuzrAj6FNEMZ63OKdITAEV845Y97nt473e";
                this.echoHandler.connector.pusher.config.auth.headers["Accept"] = "application/json";
                this.isConnected = true;
            }, 100);
        });
        this.echoHandler.connect();
        this.initDone = true;
        Log.silly("WebsocketHandler", "Started.");
    };

    /* HOW TO LISTEN FOR EVENTS
    The event has to be prefixed with a '.'.
    The data for this example was '{"message": "test"}'.

    this.echoHandler.channel("Test").listen('.OrderShipmentStatusUpdated', (e: any) => {
            console.log("got event: " + e.message);
        });
    */
}
export default WebsocketHandler;