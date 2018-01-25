const sections = {
  header: {
    image: 'myImages/project-mam-logo-black.png',
    title: 'Welcome to Project MaM',
    text: 'This is my personal website. It shares my personal projects and will also be the home for my blog (when I get around to writing some posts!)',
    socialItems: [
      {
        link: 'https://www.facebook.com/michaelalexandermartinez',
        icon: 'ion-logo-facebook'
      },
      {
        link: 'https://twitter.com/MikeAlMartinez',
        icon: 'ion-logo-twitter'
      },
      {
        link: 'https://www.linkedin.com/in/michael-alexander-martinez-b9073742',
        icon: 'ion-logo-linkedin'
      },
      {
        link: 'https://plus.google.com/u/0/106701963549260967393',
        icon: 'ion-logo-googleplus'
      },
      {
        link: 'https://github.com/MikeAlexMartinez',
        icon: 'ion-logo-octocat'
      },
    ]
  },
  subscribe: {
    sectionHeaderText: 'Stay tunned more projects and blog posts are on the way!',
  },
  gallery: {
    projects: [
      {
        image: '/myImages/projects/ranger-clone/ranger-long.png',
        heading: 'Ranger Clone',
        author: 'Michael Martinez',
        link: '/view/ranger-clone',
        detail: [
          'This is the second website \'clone\' that I\'ve created. It is inspired by the \'Ranger\' templace found at free-css.com.'
        ],
      },
      {
        image: '/myImages/projects/resume-clone/resume-resume.png',
        heading: 'Resume Clone',
        author: 'Michael Martinez',
        link: '/view/resume-clone',
        detail: [
          'This is the first project I completed which was set by P1xt in his comprehensive web development curriculum. It involved replicating the resume found here: https://creativemarket.com/ikonome/686585-Material-Resume-Blue/screenshots/#screenshot1'
        ],
      },
      {
        image: '/myImages/projects/deft-clone/deft-long.png',
        heading: 'Deft Clone',
        author: 'Michael Martinez',
        link: '/view/deft-clone',
        detail: [
          'This is the third website \'clone\' that I\'ve created. It is inspired by the \'Deft\' templace found at free-css.com.'
        ],
      },
      {
        image: '/myImages/projects/minifolio-clone/minifolio-home.png',
        heading: 'Minifolio Clone',
        author: 'Michael Martinez',
        link: '/view/minifolio-clone',
        detail: [
          'This is the first website \'clone\' that I\'ve created. It is inspired by the Minifolio template found at free-css.com. I didn\'t use any of the source code to create it but did research the libraries used so that I could discover, and learn how to use the libraries that the original developer used when creating the template.'
        ],
      },
      {
        image: '/myImages/projects/project-mam/project-mam-home.png',
        heading: 'Project MaM',
        author: 'Michael Martinez',
        link: '/',
        detail: [
          'This is the website for my project portfolio... You are on it right now! But you knew that right!?'
        ],
      },
    ],
  },
  skills: {
    sectionHeaderText: 'About Me',
    mainText: [
      'Passionate about learning new things, solving problems, and finding patterns in all things, I started to take programming seriously in 2016 when I discovered d3.js and decided that I ought to learn JavaScript as I wanted to be able to make my own visualistaions. Down the rabbit hole I went...',
      'Fast forward 15 months and in setting out to learn JavaScript I discovered that I love programming and application development especially, and I made it my aim to become a professional web application developer by Mid-2018. For too much of 2017 I had my head in books, I was solving Kata\'s on codewars and I was reading blog posts and tutorials, but now I have decided that 2018 will be a year of action, where I learn by doing and not reading. This website will be the hub that hosts my various creations.',
      'As I create more projects I will add them here. If you want to see projects that specifically used the skills listed below click the skill you are most interested in.'
    ],
    skillList: [
      {skill: 'Javascript', image: 'js.png' },
      {skill: 'HTML5', image: 'html5.png' },
      {skill: 'CSS3', image: 'css3.png' },
      {skill: 'Node', image: 'node.png' },
      {skill: 'Express', image: 'express.png' },
      {skill: 'MongoDB', image: 'mongo.png' },
      {skill: 'Postgres', image: 'postgres.png' },
      {skill: 'React', image: 'react.png'},
      {skill: 'CIMA', image: 'CIMA.png'}      
    ]
  },
  contactForm: {
    sectionHeaderText: 'Get in #[span touch], I would love to hear from you.',
    mainText: ['Whether it\'s to give me feedback, offer me work, or just to say hello, I\'d love to hear from you.'],
  },
  footer: {
    copyright: ' MikeAlexMartinez - made with',
  }
};

module.exports = {
  data: sections,
};