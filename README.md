# GulpTemplate 
[ ![Codeship Status for ecraciun/GulpTemplate](https://codeship.com/projects/7ecf3920-b2fd-0133-7ecc-4a6e91c1fec7/status?branch=master)](https://codeship.com/projects/133539)

Gulp common tasks for my node.js projects packed in a "template" starter web project.
This is just going to grow over time, I hope in quality and features.


## Purpose 


This is a personal starter project template for Node.js web applications.

I'm new to the whole MEAN stack so I'm taking one step at the time, starting with the tooling.


## Current features

- typescript on server side code
- build for production task *$ gulp build:prod*
- one awesome development gulp task that runs the server, watches and compiles less, typescript files, brings all library components from bower folder, injects every .css and .js file inside the index.html file  and reloads the browser

*Behind the scene features:*

- I've just linked this repo to [Codeship] to pave the way to a continuous delivery model. Currently the server is building and deploying the build results to an Ubuntu Server virtual machine hosted on Microsoft Azure.


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
$ typings install
$ gulp start
```

The *start* task will start up browser sync and nodemon and you can begin coding right away (provided that everything builds correctly first **fingers crossed for this!**).
You should see any change almost instantly in your browser.


## Continuous Integration implemented using [Codeship]

I'll just share how I've set up my Test & Deploy pipeline, because this might save you some time. 


### Prerequisites

I'm using an Ubuntu Server 14.04. You can download the latest version [here](http://www.ubuntu.com/download/server "Ubuntu server download").
Mine is hosted on an A0 virtual machine instance size (just for testing) on [Microsoft Azure].

#### Required programs

Make sure you have the following installed:
- nodejs *(dooh, you how else would you run your app?)*
- upstart *(should come pre-installed by default, but it helps create a service that spins up your node app)*
- [nginx] *(a HTTP and reverse proxy server)*

#### Set up Codeship public SSH key

Run this on your server:
```sh
$ mkdir -p ~/.ssh
$ touch ~/.ssh/authorized_keys
$ chmod -R go-rwx ~/.ssh/

# add the Codeship public SSH key to ~/.ssh/authorized_keys
# public SSH key can be found on your Codeship project's General Settings page
$ editor ~/.ssh/authorized_keys
``` 

This will allow Codeship to run commands automatically on your server without a password.

#### Set up service for your nodejs app

```sh
$ nano /etc/init/YOUR_NODE_APP_SERVICE_NAME.conf
# enter your service configuration; mine looks something like this for now

description "SOME DESCRIPTION"
author "WHOEVER"

start on (filesystem and net-device-up IFACE=lo)
stop on shutdown


respawn

script

        export HOME="/root"
        env PORT=3000
        env NODE_ENV=production

        chdir /home/Mili/gulptemplate

        #exec /usr/bin/npm install --production
        exec /usr/bin/node /PATH/TO/NODEJS/APP/server/app.js >> /...../some_log.log
end script
```

And then just start it using
```sh
$ start YOUR_NODE_APP_SERVICE_NAME
```

#### Set up nginx

*(to be continued, not yet done)*



### Codeship: Test 

**Be sure you have the user you are using to connect via SSH in the sudoers group with no password. Use _visudo_ to edit the configuration file.**

```sh
nvm install 5.6
npm install typescript -g
npm install gulp -g
npm install bower -g
bower install
npm install
gulp build:prod
# actual tests will come later, for now just build everything for production
```

### Codeship: Deployment

I've set the branch to master.
```sh
scp -rp ./dist/* YOUR_USER@YOUR_SERVER:/PATH/TO/NODEJS/APP
ssh YOUR_USER@YOUR_SERVER '/PATH/TO/AFTER_DEPLOYMENT_SCRIPT/after.sh'
```

Contents of *after.sh*:
```sh
#!/bin/bash

cd /PATH/TO/NODEJS/APP
npm install --production
sudo restart YOUR_NODE_APP_SERVICE_NANE
```

## Roadmap

*Not necessarily in this order. These are just some ideas so I don't forget.*

- add unit tests for server side code
- add unit tests for client side code
- maybe think everything as a single page application and just have a single *index.html*? (and just have an API on the server side and/or pre-rendered html)
- add angular 2 and make it work (**whooohooo!**)
- implement logging
- maybe have somne kind of an [Application Insights] telemetry data gathering, but for the current setup
- maybe make this as a [Yeoman] scaffolding template

*Behind the scenes stuff again*

- inject sensitive configuration data (like connection strings) into the application using the build server
- make sure the build server will also run the tests (when they will be added)
- prepare the "production" environment on my (hopefully) soon to be shipped [RaspberryPi 2]
- make sure to use a Dynamic DNS service to update the IP (and make a chron script)


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
[Codeship]: <https://codeship.com/>
[Yeoman]: <http://yeoman.io/>
[Bower]: <http://bower.io/>
[Microsoft Azure]: <https://azure.microsoft.com>
[nginx]: <http://nginx.org/en/>
