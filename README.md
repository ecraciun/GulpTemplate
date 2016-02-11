# GulpTemplate 
[ ![Codeship Status for ecraciun/GulpTemplate](https://codeship.com/projects/7ecf3920-b2fd-0133-7ecc-4a6e91c1fec7/status?branch=master)](https://codeship.com/projects/133539)

Gulp common tasks for my node.js projects packed in a "template" starter web project.
This is just going to grow over time, I hope in quality and features.


## Purpose 


This is a personal starter project template for Node.js web applications.

I'm new to the whole MEAN stack so I'm taking one step at the time, starting with the tooling.


## Current features

- typescript on server side code
- less compilation task that also combines all resulting css into one single file and creates a minified version of it
- working browser-sync
- one awesome development gulp task that runs the server, watches and compiles less, typescript files and reloads the browser


*Behind the scene features:*

- I've just linked this repo to [Codeship] to pave the way to a continuous delivery model 


## Prerequisites

* [Node.js] Firstly you have to get and install Node.js, of course!
* Any freaking code editor. I used [Visual Studio Code]
* I don't remember anything else. Oh, yeah, maybe you should grab a beer ;)


## Installation

### Global packages
```sh
$ npm install gulp -g 
$ npm install typescript -g
$ npm install typings -g
$ npm install nodemon -g
$ npm install bower -g
```
*Yes, yes, you could combine them all into a single command and use the shorthand "i" argument instead of "install"*

>**Here are the links if you want to learn more**
>- [Gulp]
>- [Typescript]
>- [Nodemon]
>- [Typings]
>- [Bower]


### The actual project

Just navigate to the project's root folder with your console and run these commands:
```sh
$ npm install
$ bower install
$ gulp start
```

The *start* task will start up browser sync and nodemon and you can begin coding right away (provided that everything builds correctly first **fingers crossed for this!**).
You should see any change almost instantly in your browser.


## Roadmap

*Not necessarily in this order. These are just some ideas so I don't forget.*

- freaking use [Bower] for UI packages
- add unit tests for server side code
- add unit tests for client side code
- make a build task to compile, concatenate, minify, and copy everything in the *dist* folder
- maybe think everything as a single page application and just have a single *index.html* file in which references to assets are injected by a task? (and just have an API on the server side)
- add angular 2 and make it work (**whooohooo!**)
- implement logging
- maybe have somne kind of an [Application Insights] thingy but for the used technologies and environment
- maybe make this as a [Yeoman] scaffolding template

*Behind the scenes stuff again*

- update build server build configuration
- create a "master_dist" branch in which the build server will push every successful build
- make sure the build server will also run the tests (when they will be added)
- prepare the "production" environment on my (hopefully) soon to be shipped [RaspberryPi 2]
- make sure to use a Dynamic DNS service to update the IP (and make a chron script)
- create a webhook in Github to notify my server that a new push has been made 
- create a listener on the server for Github's notifications (and somehow check if the branch is the "master_dist" one and not any other) that will pull the new code, deploy and restart the server (and maybe just get the diffs, not everything). Or just use [POD] if it's not too resource intensive.


## Final notes

You can use this code wherever, whenever and however you want. It might work or not. Take it as it is and don't blame me. 
But I do accept constructive feedback and suggestions.


[Node.js]: <http://nodejs.org> "Node.js"
[Visual Studio Code]: <https://www.visualstudio.com/products/code-vs> "Pretty cute, but it lacks a shitload of features."
[Gulp]: <http://gulpjs.com/>
[Typescript]: <https://www.npmjs.com/package/typescript>
[Nodemon]: <https://www.npmjs.com/package/nodemon>
[Typings]: <https://www.npmjs.com/package/typings>
[RaspberryPi 2]: <https://www.raspberrypi.org/products/raspberry-pi-2-model-b/>
[Application Insights]: <https://azure.microsoft.com/en-us/services/application-insights/>
[POD]: <https://github.com/yyx990803/pod>
[Codeship]: <https://codeship.com/>
[Yeoman]: <http://yeoman.io/>
[Bower]: <http://bower.io/>