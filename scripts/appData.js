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
    sectionHeaderText: 'Stay tunned we\'re coming this year',
  },
  gallery: {
    projects: [
      {
        image: '/myImages/projects/ranger-clone/ranger-long.png',
        heading: 'Ranger Clone',
        author: 'Michael Martinez',
        detail: [
          'This is the second website \'clone\' that I\'ve created. It is inspired by the \'Ranger\' templace found at free-css.com.'
        ],
      },
      {
        image: '/myImages/projects/resume-clone/resume-resume.png',
        heading: 'Resume Clone',
        author: 'Michael Martinez',
        detail: [
          'This is the first project I completed which was set by P1xt in his comprehensive web development curriculum. It involved replicating the resume found here: https://creativemarket.com/ikonome/686585-Material-Resume-Blue/screenshots/#screenshot1'
        ],
      },
      {
        image: 'images/hand-taking-photo-photography-vintage.jpg',
        heading: 'Camera',
        author: 'Code Rare',
        detail: [
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, amet, voluptatibus et omnis dolore illo saepe voluptatem qui quibusdam sunt corporis ut iure repellendus delectus voluptate explicabo temporibus quos eaque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, amet, voluptatibus et omnis dolore illo saepe voluptatem qui quibusdam sunt corporis ut iure repellendus delectus voluptate explicabo temporibus quos eaque?',
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, amet, voluptatibus et omnis dolore illo saepe voluptatem qui quibusdam sunt corporis ut iure repellendus delectus voluptate explicabo temporibus quos eaque?'
        ],
      },
      {
        image: '/myImages/projects/minifolio-clone/minifolio-home.png',
        heading: 'Minifolio Clone',
        author: 'Michael Martinez',
        detail: [
          'This is the first website \'clone\' that I\'ve created. It is inspired by the Minifolio template found here <a href="http://www.free-css.com/free-css-templates/page218/minifolio">free-css.com</a>. I didn\'t use any of the source code to create it but did research the libraries used so that I could discover, and learn how to use the libraries that the original developer used when creating the template.'
        ],
      },
      {
        image: '/myImages/projects/project-mam/project-mam-home.png',
        heading: 'Project MaM',
        author: 'Michael Martinez',
        detail: [
          'This is the website for my project portfolio... You are on it right now! But you knew that right!?'
        ],
      },
    ],
  },
  skills: {
    sectionHeaderText: 'Get started fast with one of our unique, pre-built concepts.',
    mainText: [
      'Customers love our block-based approach to template building, it makes assembling beautiful pages fast and enjoyable, leaving more time to craft your perfect layout. love our block-based approach to template building, it makes assembling beautiful pages fast and enjoyable, leaving more time to craft your perfect layout.',
      'Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit.'
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
    copyright: ' MikeAlexMartinez - made with love',
  }
};

module.exports = {
  data: sections,
};