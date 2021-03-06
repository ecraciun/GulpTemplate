# GulpTemplate 
[ ![Codeship Status for ecraciun/GulpTemplate](https://codeship.com/projects/7ecf3920-b2fd-0133-7ecc-4a6e91c1fec7/status?branch=master)](https://codeship.com/projects/133539)

Gulp common tasks for my node.js projects packed in a "template" starter web project.
This is just going to grow over time, I hope in quality and features.


## Purpose 


This is a personal starter project template for Node.js web applications.

I'm new to the whole MEAN stack so I'm taking one step at the time, starting with the tooling.


## Current features

- typescript on server side code and on client side (combining these two gave me some headaches)
- working [Angular 2] 
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
$ cd server
$ typings install
$ cd ../client
$ typings install
$ cd ..
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

#### Install Node.js
```sh
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

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

        chdir /PATH/TO/NODEJS/APP

        #exec /usr/bin/npm install --production
        exec /usr/bin/nodemon /PATH/TO/NODEJS/APP/server/app.js >> /...../some_log.log
end script
```

And then just start it using
```sh
$ start YOUR_NODE_APP_SERVICE_NAME
```

#### Set up nginx

```sh
# remove the default nginx site symlink to disable it, but keep the actual file close, it might help you 
$ rm /etc/nginx/sites-enabled/default 

# create a new configuration file for your app
$ nano /etc/nginx/sites-available/node

# this is my configuration file, yours might look different

server {
        listen 80;
        listen [::]:80;

        location / {
                proxy_pass http://127.0.0.1:3000/;
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
        }

        location /assets/ {
                alias /PATH/TO/NODEJS/APP/client/;
                autoindex off;
        }
}

# save and close

$ ln -s /etc/nginx/sites-enabled/node /etc/nginx/sites-available/node 

# restart nginx to reload the configuration
$ restart nginx
```

And that's it! For now, I kept it simple. I will probably change a few things here and there, but I'll update the documentation when the time comes.


### Set up and install [MongoDB]

You may follow the steps [here](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/) or just get the short version below:
```sh
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
$ echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
$ sudo service mongod start 
```
*The last step, starting the service might not be necessary because for me it started automatically after the install.*

Then configure the users:
```sh
# create main admin user
$ mongo
> use admin
> db.createUser({user: "YOUR_ADMIN_USER", pwd:"YOUR_ADMIN_PASSWORD", roles:[{ role: "userAdminAnyDatabase", db: "admin"}]})
> use gulptemplate
> db.createUser({user: "YOUR_DB_OWNER", pwd:"YOUR_DB_OWNER_PASSWORD", roles:[{ role: "dbOwner", db: "gulptemplate"}]})
> db.createUser({user: "YOUR_DB_USER", pwd:"YOUR_DB_USER_PASSWORD", roles:[{ role: "readWrite", db: "gulptemplate"}]})
```

>*If you want to be able to remotely connect to your mongodb instance, you must edit the /etc/mongd.conf file and comment out the line "bindIp: 127.0.0.1". And also remember to open up the port in your firewall.*


### Codeship: Test 

**Be sure you have the user you are using to connect via SSH in the sudoers group with no password. Use _visudo_ to edit the configuration file.**

```sh
nvm install 6.1
npm install typescript -g
npm install gulp -g
npm install bower -g
npm install typings -g
bower install
npm install
cd server
typings i
cd ../client
typings i
cd ..
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

- since I've added [Angular 2] on the client side, I had to go back and modify several [Gulp] tasks: there is no more Javascript libraries concatenation and injection into the html page for now since they must be added in the correct order in order for them to actually work; I might revisit this at some point in the future
- make everything HTTPS
- add unit tests for server side code
- add unit tests for client side code
- add authentication and authorization
- maybe think everything as a single page application and just have a single *index.html*? (and just have an API on the server side and/or pre-rendered html)
- maybe have somne kind of an [Application Insights] telemetry data gathering, but for the current setup
- maybe make this as a [Yeoman] scaffolding template

*Behind the scenes stuff again*

- inject sensitive configuration data (like connection strings) into the application using the build server
- make sure the build server will also run the tests (when they will be added)
- prepare the "production" environment on my (hopefully) soon to be shipped [RaspberryPi 3]
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
[RaspberryPi 3]: <https://www.raspberrypi.org/products/raspberry-pi-3-model-b/>
[Application Insights]: <https://azure.microsoft.com/en-us/services/application-insights/>
[Codeship]: <https://codeship.com/>
[Yeoman]: <http://yeoman.io/>
[Bower]: <http://bower.io/>
[Microsoft Azure]: <https://azure.microsoft.com>
[nginx]: <http://nginx.org/en/>
[MongoDB]: <https://www.mongodb.org/>
[Angular 2]: <https://angular.io/>