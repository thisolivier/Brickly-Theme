# Olivier Empire 2

## Premis
This is a Wordpress theme that does not rely on the Wordpress templating engine for building pages. It serves a ReactJS app, allowing the designer to build truly flexible UI's. It can query the Wordpress RESTful API, or have Wordpress inject data when serving the app. 

## Get Started
1. Setup Wordpress (I recommend using [Trellis from Roots.io](https://roots.io/trellis/)), and [clone this repository](https://help.github.com/articles/cloning-a-repository/) into the themes directory.
2. Install Node v6+ (I recommend using [NVM](https://github.com/creationix/nvm).
3. Run `$ npm install` from inside the theme directory. This will make Node's package manager install the packages needed for you to get started.
4. You can now build and preview the theme. Run `$ npm run build` for a one-off, or `$ npm run watch` to track changes. If you go to your Wordpress site in a browser now, you should see a react app, your react app. Good luck!

## Where to start changing things
Data is injected into the react app as specified in `./functions.php`. We also tell Wordpress we want to inject a CSS and JS file into any pages it serves- these files make up React app and are built when you run `$ npm run build`. This file also tweaks Wordpress so redundant scripts aren't served, and opens up custom API endpoints.

The `./react_app` directory contains all the files that make up the react app before they are stiched together. Exactly how these files are processed is configured for seving using webpack's `./webpack.config.js`. To see the processed files, look in `./react_app_built`, but remeber that this directory is replaced every time you build, you should *never ever* need to edit stuff in it directly.

You likely won't need to touch `index.php`, but it's worth mentioning. It is the page Wordpress actually serves to a client visiting your site. For those unfamiliar with `PHP`, the file is parsed on the server every time someone requests it, and the server turns it into HTML (while injecting content from your database, for example). It is this initial page where your React app's script and css are linked to, as we requested in `./functions.php`. Once the client receives them, the contents of the page is replaced with your app by React.


## ToDo
1. Implement dynamic routing/coorinator flow, see react-router (done)
    - [x] Implement MVP routing 
    - [x] Add links and check navigation between MVP
2. Build interface with Wordpress
    - [x] MVP storing info
    - [x] Need to add menu locations to allow menus to work again
    - [x] Create stores for meta info and components for rendering
    - [x] Create stores for categories and components for rendering
    - [x] Create stores for posts and components for rendering
3. Add fonts (done)
4. Write css for sidebar (done)
    - [x] Add backgrounds
    - [x] Set font sizing
    - [x] Set column width
    - [x] Add decorations
5. Write css for main page animation
    - [ ] On mount, the body should have a loading class, which will set scaling and position of cloud & tower
    - [ ] Tower will fill 5 brick high template, each brick is added on a delayed loop, with react-transition group handling the appearance.
    - [ ] Once the final brick’s been animated in, remove loading class, and the rest will transition.
    - [ ] Finally, inject the DOM for the brick titles and sidebar content.
6. Make the background work
7. Build UI 
    - [ ] Make the tower build 
    - [ ] Make the tower zoom into place 
    - [ ] Make a category build 
    - [ ] Make a tower brick go to a category 
    - [ ] Make back button work
8. Make post bricks rich
