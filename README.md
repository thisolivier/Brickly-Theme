# Introduction
This is a Wordpress theme that does not rely on the Wordpress templating engine for building pages. It serves a ReactJS app, allowing the designer to build truly flexible UI's. It can query the Wordpress RESTful API, or have Wordpress inject data when serving the app. 

These docs are a bit messy, and come the New Year I'll try and separate out a starter theme.

## How is this different from a normal Wordpress Theme?
In every way. One basic thing to get straight is that in our theme, the page is only served once, then React takes over. As the client navigates around, it's React that's building the new pages from inside the client's browser. This is normal for a single page app (SPA), but very different from how engines like Wordpress and Django normally work, serving new pages when links are clicked. 

The only Wordpress stuff we need to do is serve our React script and CSS (no matter what page the client visits), and to get data into the app.

## How much do I need to know?
A bit, if I'm honest. You should know what Wordpress is and how themes are different from plugins, and how to use Wordpress to get specific content (for example, [get_post](https://developer.wordpress.org/reference/functions/get_post/)).

You should be familiar with Webpack, and not freak out at the idea of adding some new rules to it. You should know what React is, and how components work together, and be aware I hadn't used React Router v4 before this project so, if my routing looks insane it's because it is.

# Instructions
These will take you through the basics of building or compiling the theme for development and for production. The obvious question I don't answer is how to implement your own design- see the section 'How is this working anyway?'.

## Get Started
1. Setup Wordpress (I recommend using [Trellis from Roots.io](https://roots.io/trellis/)), and [clone this repository](https://help.github.com/articles/cloning-a-repository/) into the themes directory.
2. Install Node v6+ (I recommend using [NVM](https://github.com/creationix/nvm).
3. Run `$ npm install` from inside the theme directory. This will make Node's package manager install the packages needed for you to get started.
4. You can now build and preview the theme. Run `$ npm run build` for a one-off, or `$ npm run watch` to track changes. If you go to your Wordpress site and set this as the theme, your site will now serve the react app!
5. You can copy the theme files to any Wordpress site and it should work. But only do this for testing purposes.

## Building for Production
1. Go into your theme directory and run `$ npm run produce`. This will build a production optimised React App for you.
2. Copy your theme folder, and in the copy, delete everything apart from the following four items:
    - The `react_app_built` directory
    - `index.php`
    - `functions.php`
    - `style.css`
3. Your theme is now production ready (sort of, you should absolutely check my Webpack config), go zip it up and send it to the internet.

# An Attempt at Documentation
## How is this working anyway?
In this dinky theme, it all comes down to `./functions.php`. This file is the required heart of any Wordpress theme, and tells Wordpress what we want done, and what our theme is capable of. We are essentially only doing 3 things in `functions.php`:
1. We tell Wordpress we want to inject a CSS and a JavaScript file into any pages it serves- these files make up our React app and are built when you run `$ npm run build`. 
2. **All your data from Wordpress, like posts and pages, is injected into the ReactJS app as the page is seved.** This means few if any async GET requests are needed down the line (trust me, it's a joy, but you can use [Wordpress' API](https://developer.wordpress.org/rest-api/) to dynamically request content should you wish. Also, don't inject sensitive data this way, it's very visible!).
3. There are also tweaks to Wordpress so redundant scripts aren't served (not perfect, but works). 

**The most relevant thing for YOU is probably point 2. This is effectively the creation of a static store of data. You'll see I have written various helper functions to gather and format the data- you will almost certainly need to think about what data YOU need in your app, and modify things accordingly.**

In `functions.php` we could also add custom API endpoints for forms and other dynamic content. Or we can do complex server side calculations. Just remember, the idea is to use Wordpress as the flexible content management tool, and consume its output with ReactJS, we don't want to waste any energy building some clunky middleware. So, get your data injected and get out quick.

The other Wordpress-y file is `index.php`. It is the page Wordpress actually serves to a client visiting your site. It also sets fallback properties for the open graph protocol- these are often the ones used when sharing your site, so check them over. A bit of background for those unfamiliar with `PHP`: the file is parsed on the server every time someone requests it, and the server turns it into `HTML`. It is while serving this that our React script and css are injected, as we defined in `./functions.php`.

That's all there is to getting our App served from a Wordpress theme. It's not tricky to setup from scratch if you're a Wordpress dev or know PHP.

## So, React you say?
The `./react_app` directory contains all the files that make up the react app before they are stiched together. Exactly how these files are processed is configured for seving using webpack's `./webpack.common.js`. To see the processed files, look in `./react_app_built`, but remeber that this directory is replaced every time you build, you should *never ever* need to edit stuff in it directly.

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
- [x] Make the background work (well it’s solid blue now, so... done?)
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
- [x] Get the tower to move into position
- [x] Make back button work (Jesus Christ)
- [x] Write animations for the transition classes between home and category
    - [x] Tower off to the left and shrinks, moved up slightly
    - [x] Cloud sidebar pulls up and opacity lowers
    - [x] Cloud scales and rises SLOWER than the tower (can’t do slower, the total time has to be the same and distance is same)
    - [x] Posts and text come up from bottom fastest, but after posts have almost moved off screen
- [x] Add missing animation classes so 
    - [x] launching from various pages is smooth 
    - [x] back button always causes good animations.
- [x] Refine the post layout
    - [x] Get the image in position with content below it
    - [x] Arrange header
    - [x] Insert body/copy
    - [x] Arrange content and nav links in flex row, only the central column can grow, and the internal info class should have a max width to preserve readability.
    - [x] The read more and links should extend outward using negative margins, and the decorative background bump can be added as it is now.
- [x] Add a cloud to the category header
- [x] Attempt to deploy
- [x] Fix deployment issues
    - [x] Theme needs to be installed
    - [x] Need proper theme versioning
    - [x] Theme dependencies- need to build ansible tools
    - [x] Strip out dev dependencies after build
    - [x] Build a production app not dev
- [x] Split mobile from desktop, figure out a mobile css framework for positioning that you can leverage transition groups with.
    - [x] Desktop, do the same
- [x] Fix mobile jank
    - [x] Post footer is weird
    - [x] Bricks need a custom position animation for empty home load
        - [x] Not ‘sidebar-enter-done’ class vanishing,
        - [x] Check duration of the animation which moves the tower- how is it getting positioned after the brick-drop on mobile?
    - [x] Cloud needs to not jump up 2em after home animation
    - [x] On mobile, the content is coming up too fast. The cloud should come I sideways.
    - [x] Width going back to home on cloud is wrong
- [x] Go through each item in your skills, ensure it’s well filled in
    - [x] Add Arkera to iOS
    - [ ] Add Zap Bam Pow properly to iOS
    - [ ] Put on Gyro Giggle
    - [ ] Add some non-wordpress work
    - [x] Take out static web section
    - [ ] Make a site showing some sthing jazzy (maybe UK budget with D3)
- [ ] Final bugs to fix
    - [ ] Desktop jank on initial load
    - [ ] Can you store the state of a page visa-vie going to an open section?
    - [ ] Add medium link if you write another article
    - [ ] Width of text in desktop mode
    - [ ] Height of image in desktop mode (swap out component maybe)
