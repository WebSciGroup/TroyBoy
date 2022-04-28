# TroyBoyAngularPartial
TroyBoy Final Project
Divya, Jialin, Ayah, Chloe
4/27/2022

Goal: To create a functioning marketplace where students 
can buy and sell goods within rpi domain.

Roles:
Divya- Work on the OAuth login

Jialin- Work on homepage component and backend

Ayah- Work on the chat api and frontend

Chloe- Work on the profile component and backend

Installation Instructions:

in the backend folder:
npm init -y, 
npm install express, 
npm i mongoose, 
npm i body-parser, 
npm install --save-dev @types/jquery, 
npm install typings -g, 
typings install dt~jquery --global --save, 
npm install --save jquery

in the frontend folder: 
in the tsconfig.spec.json file add "jquery" to typings[], 
in the tsconfig.app.json file add "jquery" to typings[]


Chloe- Portions where got stuck:

With my implemetation of the profile page and a portion of the backend server.js code I
had a lot of difficulty getting the json that I was pulling from my db to connect to the
frontend. For some reason it was working on postman at first,  but I could not get it to 
correctly parse into the frontend. I had to rework a lot of my code on this, and I left 
some of it commented out in the server.js file so you could try to see what the initial
approach was. I also have some commented out code on my profile.ts file because I usually
try to leave an idea of how I initially tried to approach the problems. With jialins help I was able
to take a portion of my code and put some of it into a similar formatting of how she worked using
the http service to connect the frontend with the backend. This ended up working with my api endpoints
for postman and the application. I also had a few errors with how I was intially updating the info
on the profile page. The typescript was not correctly populating the page with the data that I wanted,
so I had to resort to finding some ways that angular can specifically edit html elements. see the profile.html and .ts
files. Now all of that portion of code is working and the last to touch up is some finishing css to match the theme better.



Ayah- Chat Implementation and Frontend design problems
I was in charge of the chat implementation for the project. At first I wasn't sure which chat API to use and what would be easiest and look good.
We had decided that the best option was SignalR chat. But a week after, we had found CometChat. There were a lot of examples we found online
that helped with the implementation of that chat. CometChat helps you walk through the implementation. They give you code to download and command lines to run for the server (npm install & start). The implementation was easy because it's straightforward and we found an open source example that used a clean frontend design similar to etsy. So we connected the chat to the frontend code we found. However, the problem was adding this code to the other backend work we had that was in a separate repo. First, we tried to just add the chat to the backend but there were github errors when we pushed such as "file name too long". This was something we didn't know how to solve because it wasn't necessarily an error with the code or paths. This file name was also what was given from cometchat and we didn't wanna change anything in it because there were other files that used that path. So we decided to connect the backend to the frontend/chat. But when we were adding the components to the frontend, there were a lot of errors because the open source code used were slightly complicated to solve. This is why we decided to just keep them separate for our demo. We tried to connect it after the presentation but more errors appeared. We didnt want to mess with the backend work but even doing it the other way was too complicated and we got a ton of server/github errors. There were errors even within the chat like path erros, packages, and path names that were given by cometchat and they werent working. 
The team decided separating the 3 errors into folders for now until we can figure out why it's not working.

Divya- portions where it got stuck:

There were serious issues committing to Github and the login woudn't push with the rest of the files to Github. I completely redid the Oauth again from scratch yesterday by creating a new project in Angular and even then continued to run into technical difficulties today as well.


