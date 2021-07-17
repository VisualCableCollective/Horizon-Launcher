// Constants
import { GET_SELF_USER_DATA_ROUTE, GET_TEAM_ROUTE } from "./constants/routes";
import { PRODUCTION_SERVER_URL } from "./constants/endpoints";

// Constants
import {
  ROUTE_ID_REPLACE_PLACEHOLDER,
  GET_PRODUCTS_OF_TEAM_ROUTE,
} from "./constants/routes";

export class HTTPRequestUtil {
  static async Request(route, data = null) {
    const routeCopy = route;

    // checks
    if (route.RequiresID) {
      if (!route.ID) {
        console.error("Horizon API: canceled request because ID was missing");
        return null;
      }
      // inject ID into the route
      routeCopy.route = route.route.replace(
        ROUTE_ID_REPLACE_PLACEHOLDER,
        route.ID.toString()
      );
    }

    if (route.RequiresParentRoute) {
      if (route.parentRoute === undefined) {
        console.error(
          "Horizon API: canceled request because parent route was missing"
        );
        return null;
      }
      routeCopy.route = route.parentRoute.route + route.route;
    }

    let actualFetch;
    // @ts-ignore
    if (window.fetch) {
      actualFetch = fetch;
    } else {
      actualFetch = require("node-fetch"); // Node Fetch
    }
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Connection: "keep-alive",
    };
    if (HorizonAPIClient.Config.BearerToken !== "") {
      headers.Authorization = `Bearer ${HorizonAPIClient.Config.BearerToken}`;
    }

    const options = {
      method: "GET",
      headers,
    };

    if (data !== null) {
      options.body = JSON.stringify(data);
    }

    let response;
    try {
      response = await actualFetch(
        HorizonAPIClient.Config.ServerUrl + routeCopy.route,
        options
      );
      return response;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  }
}
export class HorizonAPIClientConfig {
  constructor(env = Environment.Production, customLocalServerUrl = "") {
    /**
     * The current environment for the API client. Can only be set in the constructor.
     */
    this.Environment = env;

    /**
     * The current Bearer token used for authentication.
     */
    this.BearerToken = "";

    /**
     * The current server used by the API client. Will only be set when initializing the config.
     */
    this.ServerUrl = "";

    // Set ServerUrl
    switch (env) {
      case Environment.LocalDevelopment:
        if (customLocalServerUrl) {
          this.ServerUrl = customLocalServerUrl;
        } else {
          this.ServerUrl = "http://localhost:8000/api/";
        }
        break;
      default:
        this.ServerUrl = PRODUCTION_SERVER_URL;
        break;
    }
  }
}

export class HorizonApiClient {
  /**
   * Authenticates a user with the given token.
   * @param token Bearer token to authenticate a user
   * @returns true if the user has been authenticated successfully
   */
  static async authenticateUserWithToken(token) {
    /**
     * The config used by the API client.
     */
    this.Config = new HorizonAPIClientConfig();

    this.Config.BearerToken = token;
    const response = await HTTPRequestUtil.Request(GET_SELF_USER_DATA_ROUTE);
    if (response === null) {
      return false;
    }
    return response.ok;
  }

  /**
   * Tries to find a team for the given ID.
   * @param id the ID of the team
   * @returns a Team model
   */
  static async getTeam(id) {
    const getTeamRouteCopy = GET_TEAM_ROUTE;
    getTeamRouteCopy.ID = id;
    const response = await HTTPRequestUtil.Request(getTeamRouteCopy);
    if (response === null) {
      return null;
    }
    if (!response.ok) {
      return null;
    }
    return new Team(await response.json());
  }
}

export const Environment = {
  /**
   * The API client is used in a production environment and will connect to the production
   * services.
   */
  Production: 0,

  /**
   * The API client is used in a local development environment and will only connect to the local server specified in the constructor or to the default 'https://localhost:8000/' server.
   */
  LocalDevelopment: 1,
};

export class Team {
  constructor(apiTeamResponse) {
    this.id = 0;
    this.name = "";

    this.createdAt = new Date.now();
    this.updatedAt = new Date.now();
    this.id = apiTeamResponse.id;
    this.name = apiTeamResponse.name;

    this.createdAt = new Date(apiTeamResponse.created_at);
    this.updatedAt = new Date(apiTeamResponse.updated_at);
  }

  async getProducts() {
    const parentRoute = GET_TEAM_ROUTE;
    parentRoute.ID = this.id;

    const routeCopy = GET_PRODUCTS_OF_TEAM_ROUTE;
    routeCopy.parentRoute = parentRoute;

    const response = await HTTPRequestUtil.Request(routeCopy);
    if (response === null) {
      return null;
    }
    if (!response.ok) {
      return null;
    }
    const productsJSON = await response.json();
    const productsArray = [];
    await productsJSON.forEach((element) => {
      productsArray.push(new Product(element));
    });

    return productsArray;
  }
}

export class Product {
  constructor(apiProductResponse) {
    this.id = 0;
    this.name = "";

    this.createdAt = new Date.now();
    this.updatedAt = new Date.now();

    this.ownerID = 0;
    this.ownerType = "";

    this.id = apiProductResponse.id;
    this.name = apiProductResponse.name;

    this.createdAt = new Date(apiProductResponse.created_at);
    this.updatedAt = new Date(apiProductResponse.updated_at);

    this.ownerID = apiProductResponse.ownable_id;
    this.ownerType = apiProductResponse.ownable_type;
  }
}
