# Brickly Wordpress
A React.js Wordpress theme. The theme can be installed as any normal theme can be, and will serve a SPA to your client. It is in the early stages of development.

## Todo
1. Implement dynamic routing/coorinator flow, see react-router (done)
    - [x] Implement MVP routing 
    - [x] Add links and check navigation between MVP
2. Build interface with Wordpress
    - [x] MVP storing info
    - [x] Need to add menu locations to allow menus to work again
    - [x] Create stores for meta info and components for rendering
    - [x] Create stores for categories and components for rendering
    - [ ] Create stores for posts and components for rendering
3. Ensure html structure looks good, add components for decoration
4. Add fonts
5. Make the background work
6. Build UI 
    - [ ] Make the tower build 
    - [ ] Make the tower zoom into place 
    - [ ] Make a category build 
    - [ ] Make a tower brick go to a category 
    - [ ] Make back button work
7. Make post bricks rich

## Plans and Ideas

For the animation framework, I think using the canvas is going to be the right call, so I need to finish the youtube tutorial [I was working though](https://www.youtube.com/watch?v=vxljFhP2krI&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=4).

The challenge is, if all my text is in the canvas, how do we do any acessability? I can render a shadow site with minimal cost using the Canvas Shadow DOM, that takes care of extreme cases and provides a standard. On the elements themselves, we have the concept of 'focus' - when an element is touched or moused over, it should 'focus' and 'defocus'. 

Secondly, very importantly, text should be capable of selection and link following- this is the big challenge. I could absolutely position text ontop of the canvas background, but that sucks for so many reasons. If I try and build a text selection engine, I am going to need to query the position within text. That is hard, there's no API which maintains awareness of things like line-height or charachter position. It seems to draw straight from the text engine. So, no good, I need acessible text.

So, you can use foreign object to get all that done. But then you have a 2012/IE11 cliff-edge. Which isn't many years of support. You'll have to make sure the shadow DOM version is fun too :)


## To Install

Build the theme by installing Node 6+ on your machine, and running `$ npm install` in the theme directory, then `$ npm run build` to build the theme/app into `./react_app_built`, or `$ npm run watch` to use Webpack to watch for changes. Author info can be added by making a page and setting the ID in the wordpress `functions.php`, wherethe data is injected.
