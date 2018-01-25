'use strict';

const projects = [
  {
    '_id' : 'ai1cca36-3d7a-40f4-8f06-ae03cc22f045',
    'title' : 'Project MaM',
    'link' : 'https://www.projectmam.com/',
    'devlink': 'http://localhost:3030/',
    'miniDetail' : 'ProjectMaM is my personal website which displays my IT project portfolio and also is where I will keep my blog posts.',
    'associatedBlogPosts' : [ ],
    'detail': [
      {
        type: 'h3',
        content: 'This is my personal website'
      },
      {
        type: 'h3',
        content: 'All my projects will be displayed at this site.'
      },
      {
        type: 'p',
        content: 'As will my blog when I begin keeping one.'
      },
      {
        type: 'p',
        content: 'It uses node, mongodb and html, js and css.'
      }
    ],
    'git' : 'https://github.com/MikeAlexMartinez/project-mam',
    'real' : true,
    'favourite' : true,
    'lastUpdate' : new Date(2018, 1, 11),
    'createdDate' : new Date(2017, 12, 23),
    'public' : true,
    'tags': ['Node', 'express', 'winston', 'gulp','jshint', 'mocha','mongodb', 'Puppeteer', 'animate', 'async'],
    'pictures' : ['/myImages/projects/project-mam/project-mam.png'],
    'mainPicture' : '/myImages/projects/project-mam/project-mam-front.png',
    'type': 'FreeCodeCamp',
    'subtype': 'Frontend'
  },
  {
    '_id' : 'deftca36-3d7a-40f4-8f06-ae03cc22f045',
    'title' : 'Deft',
    'link' : 'https://www.projectmam.com/view/deft-clone',
    'devlink': 'http://localhost:3030/view/deft-clone',
    'miniDetail' : 'Deft is the third FreeCSS template clone that I\'ve created.',
    'associatedBlogPosts' : [ ],
    'detail': [
      {
        type: 'h2',
        content: 'Deft - Templates (FreeCSS)'
      },
      {
        type: 'h3',
        content: 'Deft is the third website whose appearance I\ve cloned.'
      },
      {
        type: 'p',
        content: 'I used a range of different librarires to achieve the desired look.'
      },
      {
        type: 'p',
        content: 'Libraries used include masonry, pug, ionicons and others.'
      }
    ],
    'git' : 'https://github.com/MikeAlexMartinez/deft-clone',
    'real' : true,
    'favourite' : true,
    'lastUpdate' : new Date(2018, 1, 10),
    'createdDate' : new Date(2017, 12, 21),
    'public' : true,
    'tags': ['Node', 'express', 'gulp', 'Puppeteer', 'masonry', 'HTML5', 'CSS3', 'Javascript', 'jQuery'],
    'pictures' : ['/myImages/projects/deft-clone/deft-front.png', '/myImages/projects/deft-clone/deft-long.png'],
    'mainPicture' : '/myImages/projects/deft-clone/deft-front.png',
    'type': 'Templates',
    'subtype': null
  },
  {
    '_id' : 'ranger36-3d7a-40f4-8f06-ae03cc22f045',
    'title' : 'Ranger',
    'link' : 'https://www.projectmam.com/view/ranger-clone',
    'devlink': 'http://localhost:3030/view/ranger-clone',
    'miniDetail' : 'Ranger is the third FreeCSS template clone that I\'ve created.',
    'associatedBlogPosts' : [ ],
    'detail': [
      {
        type: 'h2',
        content: 'Ranger - Templates (FreeCSS)'
      },
      {
        type: 'h3',
        content: 'Ranger is the second website whose appearance I\ve cloned.'
      },
      {
        type: 'p',
        content: 'I used a range of different librarires to achieve the desired look.'
      },
      {
        type: 'p',
        content: 'Libraries used include waypoints, pug, simple-line-icons and others.'
      }
    ],
    'git' : 'https://github.com/MikeAlexMartinez/ranger-clone',
    'real' : true,
    'favourite' : true,
    'lastUpdate' : new Date(2018, 1, 10),
    'createdDate' : new Date(2017, 12, 15),
    'public' : true,
    'tags': ['Node', 'express', 'gulp', 'animate', 'waypoints', 'owl.carousel', 'HTML5', 'CSS3', 'Javascript', 'jQuery'],
    'pictures' : ['/myImages/projects/ranger-clone/ranger-front.png', '/myImages/projects/ranger-clone/ranger-pricing.png', '/myImages/projects/ranger-clone/ranger-screenshots.png'],
    'mainPicture' : '/myImages/projects/ranger-clone/ranger-front.png',
    'type': 'Templates',
    'subtype': null
  },
  {
    '_id' : 'minifo36-3d7a-40f4-8f06-ae03cc22f045',
    'title' : 'Minifolio',
    'link' : 'https://www.projectmam.com/view/minifolio-clone',
    'devlink': 'http://localhost:3030/view/minifolio-clone',
    'miniDetail' : 'Minifolio is the First FreeCSS template clone that I\'ve created.',
    'associatedBlogPosts' : [ ],
    'detail': [
      {
        type: 'h2',
        content: 'Minifolio - Templates (FreeCSS)'
      },
      {
        type: 'h3',
        content: 'Minifolio is the first website whose appearance I\ve cloned.'
      },
      {
        type: 'p',
        content: 'I used a range of different librarires to achieve the desired look.'
      },
      {
        type: 'p',
        content: 'Libraries used include waypoints, pug, animate.css and others.'
      }
    ],
    'git' : 'https://github.com/MikeAlexMartinez/minifolio-clone',
    'real' : true,
    'favourite' : true,
    'lastUpdate' : new Date(2018, 1, 10),
    'createdDate' : new Date(2017, 12, 8),
    'public' : true,
    'tags': ['Node', 'Express', 'MongoDB', 'Gulp', 'Puppeteer', 'animate', 'waypoints', 'fancybox', 'HTML5', 'CSS3', 'Javascript', 'jQuery'],
    'pictures' : ['/myImages/projects/minifolio-clone/minifolio-home.png', '/myImages/projects/minifolio-clone/minifolio-about.png', '/myImages/projects/minifolio-clone/minifolio-contact.png'],
    'mainPicture' : '/myImages/projects/minifolio-clone/minifolio-front.png',
    'type': 'Templates',
    'subtype': null
  },
  {
    '_id' : 'resume36-3d7a-40f4-8f06-ae03cc22f045',
    'title' : 'Resume',
    'link' : 'https://www.projectmam.com/view/resume-clone',
    'devlink': 'http://localhost:3030/view/resume-clone',
    'miniDetail' : 'Resume is one of the first tasks set by P1xt in their web dev curriculum.',
    'associatedBlogPosts' : [],
    'detail': [
      {
        type: 'h2',
        content: 'Resume - P1xt - clone'
      },
      {
        type: 'h3',
        content: 'Resume is one of the first tasks set by P1xt in their web dev curriculum.'
      },
      {
        type: 'p',
        content: 'I used a range of different librarires to achieve the desired look.'
      },
      {
        type: 'p',
        content: 'Libraries used include waypoints, pug, animate.css and others.'
      }
    ],
    'git' : 'https://github.com/MikeAlexMartinez/resume-clone',
    'real' : true,
    'favourite' : true,
    'lastUpdate' : new Date(2018, 1, 9),
    'createdDate' : new Date(2017, 12, 1),
    'public' : true,
    'tags': ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'chartjs'],
    'pictures' : ['/myImages/projects/resume-clone/resume-resume.png', '/myImages/projects/resume-clone/resume.png', '/myImages/projects/resume-clone/resume-portfolio.png'],
    'mainPicture' : '/myImages/projects/resume-clone/resume-front.png',
    'type': 'P1xt',
    'subtype': 'clone'
  },
];

module.exports = projects;