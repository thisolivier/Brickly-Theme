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

## To Install

Build the theme by installing Node 6+ on your machine, and running `$ npm install` in the theme directory. Author info can be added by making a page and setting the ID in the wordpress `functions.php`, wherethe data is injected.
