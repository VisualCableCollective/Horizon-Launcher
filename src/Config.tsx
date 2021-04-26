export default class Config {
    static isAppInDevelopmentMode: boolean = true;
    static prodAPIServer: string = "";
    static localAPIDevServer: string = "http://localhost:8000";

    static getAPIServerURL(){
        if(this.isAppInDevelopmentMode){
            return this.localAPIDevServer;
        }else{
            return this.prodAPIServer;
        }
    }
}