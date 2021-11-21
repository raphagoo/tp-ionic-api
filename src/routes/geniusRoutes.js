import { search } from "../controllers/geniusController.js";

export const geniusRoutes = (app) => {
    app.route('/search')
        .get(search);
}
