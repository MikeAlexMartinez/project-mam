/* eslint-disable */

db = new Mongo().getDB('project-mam');

db.projects.remove({});

db.projects.insert([
  {
    "title": "ProjectMaM",
    "link": "https://www.projectmam.com/",
    "miniDetail": "ProjectMaM is my personal website which displays my IT project portfolio and also is where I will keep my blog posts.",
    "associatedBlogPosts": [],
    "git": "https://github.com/MikeAlexMartinez/project-mam.git",
    "real": true,
    "favourite": true,
    "lastUpdate": Date.now(),
    "createdDate": Date.now(),
    "public": true,
    "pictures": [],
    "mainPicture": null
  },
  {
    "title": "Frontend Certificate - FreeCodeCamp",
    "link": "https://fcc.projectmam.com/frontend/",
    "miniDetail": "This project is a container for all the frontend projects required to complete the FreeCodeCamp frontend certificate.",
    "associatedBlogPosts": [],
    "git": "https://github.com/MikeAlexMartinez/project-mam.git",
    "real": true,
    "favourite": true,
    "lastUpdate": Date.now(),
    "createdDate": Date.now(),
    "public": true,
    "pictures": [],
    "mainPicture": null
  },
  {
    "title": "Backend Certificate - FreeCodeCamp",
    "link": "https://fcc.projectmam.com/backend/",
    "miniDetail": "This project is a container for all the backend projects required to complete the FreeCodeCamp backend certificate.",
    "associatedBlogPosts": [],
    "git": "https://github.com/MikeAlexMartinez/project-mam.git",
    "real": true,
    "favourite": true,
    "lastUpdate": Date.now(),
    "createdDate": Date.now(),
    "public": true,
    "pictures": [],
    "mainPicture": null
  },
  {
    "title": "fantasizr",
    "link": "coming soon...",
    "miniDetail": "This project seeks to provide useful information to users of the Premier League's fantasy football competition.",
    "associatedBlogPosts": [],
    "git": "https://github.com/MikeAlexMartinez/fantasizr.git",
    "real": false,
    "favourite": false,
    "lastUpdate": Date.now(),
    "createdDate": Date.now(),
    "public": true,
    "pictures": [],
    "mainPicture": null
  },
  {
    "title": "Data Visualisation Certificate - FreeCodeCamp",
    "link": "https://fcc.projectmam.com/datavis/",
    "miniDetail": "This project is a container for all the data visualisation projects required to complete the FreeCodeCamp Data Visualisation certificate.",
    "associatedBlogPosts": [],
    "git": "https://github.com/MikeAlexMartinez/project-mam.git",
    "real": false,
    "favourite": true,
    "lastUpdate": Date.now(),
    "createdDate": Date.now(),
    "public": true,
    "pictures": [],
    "mainPicture": null
  },
  {
    "title": "Museum freelance calendar",
    "link": "coming soon...",
    "miniDetail": "This project will attempt to create a sharable calendar between a museum and it's freelance / zero-hour workers enabling better visibility of worker availability.",
    "associatedBlogPosts": [],
    "git": "coming soon...",
    "real": false,
    "favourite": false,
    "lastUpdate": Date.now(),
    "createdDate": Date.now(),
    "public": true,
    "pictures": [],
    "mainPicture": null
  },
  {
    "title": "hypemetr",
    "link": "coming soon...",
    "miniDetail": "hypemetr will allow independent digital content creators to monitor their influence.",
    "associatedBlogPosts": [],
    "git": "coming soon...",
    "real": false,
    "favourite": false,
    "lastUpdate": Date.now(),
    "createdDate": Date.now(),
    "public": true,
    "pictures": [],
    "mainPicture": null
  },
  {
    "title": "Project 8",
    "link": "https://www.project8.com/",
    "miniDetail": "Project placeholder text.",
    "associatedBlogPosts": [],
    "git": "https://github.com/MikeAlexMartinez/project-8.git",
    "real": false,
    "favourite": false,
    "lastUpdate": Date.now(),
    "createdDate": Date.now(),
    "public": true,
    "pictures": [],
    "mainPicture": null
  },
  {
    "title": "Project 9",
    "link": "https://www.project9.com/",
    "miniDetail": "Project placeholder text.",
    "associatedBlogPosts": [],
    "git": "https://github.com/MikeAlexMartinez/project-9.git",
    "real": false,
    "favourite": false,
    "lastUpdate": Date.now(),
    "createdDate": Date.now(),
    "public": true,
    "pictures": [],
    "mainPicture": null
  },
  {
    "title": "Project 10",
    "link": "https://www.project10.com/",
    "miniDetail": "Project placeholder text.",
    "associatedBlogPosts": [],
    "git": "https://github.com/MikeAlexMartinez/project-10.git",
    "real": false,
    "favourite": false,
    "lastUpdate": Date.now(),
    "createdDate": Date.now(),
    "public": true,
    "pictures": [],
    "mainPicture": null
  }
]);

db.projects.createIndex({ title: 1 });