// Models
import { APIRoute, RequestMethod } from '../models/APIRoute';

export const ROUTE_ID_REPLACE_PLACEHOLDER = '{id}';

export const GET_SELF_USER_DATA_ROUTE = new APIRoute('user/me', RequestMethod.GET, true, false, false);
export const GET_TEAM_ROUTE = new APIRoute('store/teams/{id}/', RequestMethod.GET, false, true, false);
export const GET_PRODUCTS_OF_TEAM_ROUTE = new APIRoute('products', RequestMethod.GET, false, false, true);
