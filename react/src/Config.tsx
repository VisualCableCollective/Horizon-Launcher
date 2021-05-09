export default class Config {
    static isAppInDevelopmentMode: boolean = true;
    static prodAPIServer: string = "";
    static localAPIDevServer: string = "http://computer.local:8000";

    static getAPIServerURL(){
        if(this.isAppInDevelopmentMode){
            return this.localAPIDevServer;
        }else{
            return this.prodAPIServer;
        }
    }

    // Websocket Server Credentials
    static pusherKey: string = "de89hDFJ34nfeunhui";
    static websocketHost: string = "localhost";
    static websocketPort: number = 6001;
    static websocketAuthEndpoint: string = Config.getAPIServerURL() + "/broadcasting/auth";
}