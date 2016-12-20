# [Brickly](http://olivier.uk/brickly-theme/)

Brickly is a WordPress theme and WordPress installation for running a Brickly portfolio.
All required plugins are registered as dependencies of the Wordpress installation.
The repo includes some test databases to get you started.

## Coming in v1

This is current version 0.9.1, version 1 will separate the theme from the installation, and setup plugin dependencies as required or recommended plugins within WordPress.

Other improvements scheduled for v1.0
* Theme options controlled through the WordPress customizer
* Better archive pages
* More page transitions animated (somehow)
* Re-formatted javascript and css to allow easy customization of animations.
* Bugs crushed!

## Coming in v2

Version 2 is currently a long way off, but the roadmap goes something like this, some of which is covered by rebasing the theme onto [Sage 9.0.0-alpha4](https://github.com/roots/sage).
* Allow for different layouts / sizes and styles of bricks
* A much more effective mobile home page
* Upgrading NPM to [Yarn](https://yarnpkg.com) to improve build time.
* Converting PHP to use [Larvel Blade](https://laravel.com/docs/5.3/blade) templating engine.
* A companion plugin to add custom input boxes in the post editor for the post meta info.
* More flexible handling of widget areas.
* Richer parallax background with customisable image content.

## Can I use this now?

Eeer, I think? The theme is built using Sage's suite of dev tools, all of which are registered as dependencies in the theme folder. If you've used Sage or Webpack and NPM before, you're set, and the readme file is just in the theme folder to help you along (don't reference the current Sage git page, the project has moved on considerably).

The other awesome and yet tricky thing about this repo is that it includes the WordPress installation. This is a [Bedrock](https://roots.io/bedrock/) installation, more lovely stuff from [Roots.io](https://roots.io/), which organizes WordPress into a much more secure, understandable structure. You'll need to be running:
* PHP >= 5.6
* Composer - [Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)

You'll need to update the .env file in the roots of this project with your details, and then follow the final steps, 3 and 4, from the (Bedrock docs)[https://github.com/roots/bedrock].
