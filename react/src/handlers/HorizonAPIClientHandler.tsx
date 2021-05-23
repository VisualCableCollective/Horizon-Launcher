// Modules
import {HorizonAPIClient, HorizonAPIClientConfig, Environment} from "horizon-api-client-ts";

class HorizonAPIClientHandler {
  private static initDone: boolean = false;
  static client: HorizonAPIClient;
  static Init() {
    if(this.initDone){
      return;
    }
    HorizonAPIClient.Config = new HorizonAPIClientConfig(Environment.LocalDevelopment);
  }
}

export default HorizonAPIClientHandler;
