import { createUser, login, listUsers, getUser, updateUser, deleteUser, likeSong, unlikeSong } from "../controllers/userController.js";

export const userRoutes = (app) => {
    app.route('/user/register')
        .post(createUser);

    app.route('/user/login')
        .post(login);

    app.route('/user/list')
        .get(listUsers);

    app.route('/user/like')
        .put(likeSong);

    app.route('/user/unlike')
        .put(unlikeSong);

    app.route('/user/:id')
        .get(getUser);

    app.route('/user/:id')
        .put(updateUser);

    app.route('/user/:id')
        .delete(deleteUser);
}
