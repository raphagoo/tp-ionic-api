import { search, getSong, stream } from "../controllers/geniusController.js";

export const geniusRoutes = (app) => {
    app.route('/search')
        .get(search);

    app.route('/songs/:id')
        .get(getSong);

    app.route('/stream/:id')
        .get(stream);
}

