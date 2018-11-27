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
- [x] Implement dynamic routing/coorinator flow, see react-router (done)
    - [x] Implement MVP routing 
    - [x] Add links and check navigation between MVP
- [x] Build interface with Wordpress
    - [x] MVP storing info (done)
    - [x] Need to add menu locations to allow menus to work again
    - [x] Create stores for meta info and components for rendering
    - [x] Create stores for categories and components for rendering
    - [x] Create stores for posts and components for rendering
- [x] Add fonts (done)
- [x] Write css for sidebar (done)
    - [x] Add backgrounds
    - [x] Set font sizing
    - [x] Set column width
    - [x] Add decorations
- [x] Write css for main page animation
    - [x] On mount, the body should have a loading class, which will set scaling and position of cloud & tower
    - [x] First, what is the flow about for the tower? How many elements are we adding?
    - [x] Once the final brick’s been animated in, remove loading class, and the rest will transition.
    - [x] Finally, inject the DOM for the brick titles and sidebar content.
- [ ] Make the background work (void?)
- [x] Build UI 
    - [x] Make the tower build 
    - [x] Make the tower zoom into place 
    - [x] Make a category build 
    - [x] Make a tower brick go to a category 
    - [x] Make back button work
- [x] Make post bricks rich
- [x] Plan the final stages
- [x] finish implementing your triggers for appear appearing appeared, disappear, disappearing, disappeared. 
    - [x] Find out how to add a pre-appear animation, or possibly, arbitrary VERB VERBing VERDed
    - [x] Ensure components rendered by the root hang about as they dismount.
    - [x] Add transitions with simple text or background colour css response and ensure all components are targeted as needed. You only need the parents targeted.
    - [x] Add transition states to cloud
    - [x] Make the link to the categories work
- [ ] Get the tower to move into position
- [ ] Write animations for the transition classes between home and category
    - [ ] Tower off to the left and shrinks, moved up slightly
    - [ ] Cloud sidebar pulls up and opacity lowers
    - [ ] Cloud scales and rises SLOWER than the tower
    - [ ] Posts and text come up from bottom fastest, but after posts have almost moved off screen
- [ ] Refine the post layout
- [ ] Split mobile from desktop, figure out a mobile css framework for positioning that you can leverage transition groups with. (Should be easy now)
    - [x] Desktop, do the same
- [ ] Tweak positioning and choose colours (blue, or pink)
- [ ] Go through each item in your skills, ensure it’s well filled in
    - [ ] Add in some iOS stuff.


