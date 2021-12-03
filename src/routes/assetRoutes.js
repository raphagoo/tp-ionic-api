import { getAssetFile } from "../controllers/assetController.js";

export const assetRoutes = (app) => {
    app.route('/.well-known/assetslink.json')
        .get(getAssetFile);
}
