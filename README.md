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
npm init -y
npm install express
npm i mongoose
npm i body-parser
npm install --save-dev @types/jquery
npm install typings -g
typings install dt~jquery --global --save
npm install --save jquery

in the frontend folder: 
in the tsconfig.spec.json file add "jquery" to typings[]
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



