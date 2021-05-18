// Modules
import {HorizonAPIClient, HorizonAPIClientConfig, Environment} from "horizon-api-client-ts";

class HorizonAPIClientHandler {
  private static initDone: boolean = false;
  static client: HorizonAPIClient;
  static Init() {
    if(this.initDone){
      return;
    }
    let config = new HorizonAPIClientConfig(Environment.LocalDevelopment);
    this.client = new  HorizonAPIClient(config);
  }
}

export default HorizonAPIClientHandler;
