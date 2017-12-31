'use strict';

const projectTypes = [
  {
    name: 'FreeCodeCamp',
    parent: null,
    detail: 'These projects are those that are set and / or defined by the FreeCodeCamp website. ' +
            'They fall into three sub-categories: Frontend projects, Backend Projects and Dataviz' +
            ' projects.',
    children: ['Backend', 'Frontend', 'Dataviz'],
    source: 'https://www.freecodecamp.org/mikealexmartinez',
  },
  {
    name: 'P1xt',
    parent: null,
    detail: 'My P1xt projects are those that have been set by the github user P1xt. ' +
            'The P1xt curriculum lists a range of resources, and tasks to provide a more ' +
            'comprehensive overview of web development.',
    children: null,
    source: 'https://github.com/P1xt/p1xt-guides/blob/master/cs-wd.md',
  },
  {
    name: 'Templates',
    parent: null,
    detail: 'These represent my attempts at cloning a websites appearance and feel without using ' +
            'any original source code. Primarily I\'ve used the FreeCss website to get templates ' +
            'which I can then view in order to clone. Initially this was a task set in the P1xt ' +
            'curriculum but I found it to be a very useful way to improve my html, css, and js ' +
            'so I decided to do more of these and separate this into it\'s own project.',
    children: null,
    source: 'https://github.com/MikeAlexMartinez/templates',
  },
  {
    name: 'Other',
    parent: null,
    detail: 'These are projects that I\'ve completed but don\'t fall into any of the other ' +
            'predefined buckets',
    children: null,
    source: null,
  },
  {
    name: 'Backend',
    parent: 'FreeCodeCamp',
    detail: 'These are projects set in the FreeCodeCamp curriculum and are set in order to ' +
            'promote and prove the development of my skills relating to backend web development.',
    children: null,
    source: null,
  },
  {
    name: 'Frontend',
    parent: 'FreeCodeCamp',
    detail: 'These are projects set in the FreeCodeCamp curriculum and are set in order to ' +
            'promote and prove the development of my skills relating to frontend web development.',
    children: null,
    source: null,
  },
  {
    name: 'Dataviz',
    parent: 'FreeCodeCamp',
    detail: 'These are projects set in the FreeCodeCamp curriculum and are set in order to ' +
            'promote and prove the development of my skills relating to Data Visualisation. ' +
            'This project also necessitates the use of the skills developed in the other two ' +
            'areas of the FreeCodeCamp curriculum (Frontend & Backend)',
    children: null,
    source: null,
  },
];

module.exports = {
  projectTypes: projectTypes,
}