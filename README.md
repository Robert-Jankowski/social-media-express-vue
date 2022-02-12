# Backend technologies
- HTTPS express server
- routes secured using JSON Web Token
- secured and public Websocket instances
- MongoDB as database, Mongoose
- serve static UI files

# Frontend technologies
- Vue3
- Vuex, Vue Router
- NaiveUI as component library



# Features
- Login/Register system (with password hashing)
- Custom "revive session" logic
- Friend request system with Websocket notifications
- Public/private user walls with refresh mechanism
- Editable user profile

# Run

- `yarn dev-ui` - run Vue dev server
- `yarn dev-api` - run Express dev server
- `yarn build-ui` - build Vue static files
- `yarn build` - build both UI and API files
- `yarn prod` - like `yarn build`, but also run server
