export class APIRoute {
    constructor(route, method, requiresAuth, requiresID, requiresParentRoute) {
        this.Route = "";
        this.Method = RequestMethod.None;
        this.RequiresAuth = false;
        this.RequiresID = false;
        this.RequiresParentRoute = false;
        this.ParentRoute = null;
        this.ID = null;

        this.Route = route;
        this.Method = method;
        this.RequiresAuth = requiresAuth;
        this.RequiresID = requiresID;
        this.RequiresParentRoute = requiresParentRoute;
    }
}

export const RequestMethod = {
    None: 0,
    GET: 1,
    POST: 2,
}
