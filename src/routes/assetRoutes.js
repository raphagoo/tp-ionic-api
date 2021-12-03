import { getAssetFile } from "../controllers/assetController.js";

export const assetRoutes = (app) => {
    app.route('/.well-known/assetlinks.json')
        .get(getAssetFile);
}
