'use strict';

const messages = [
  {
    _id: 'sender01-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-1',
    subject: 'Hello One',
    email: 'test1@mail.com',
    message: 'Hello from sender 1.',
    createdDate: new Date(2012, 11 , 1, 12, 10, 2),
    read: false,
    validated: true,
    important: true,
    replied: true,
    source: 'templates/deft',
    ip: '150:200:200:250'
  },
  {
    _id: 'sender02-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-2',
    subject: 'Hello Two',
    email: 'test2@mail.com',
    message: 'Hello from sender 2.',
    createdDate: new Date(2014, 11 , 1, 12, 10, 2),
    read: false,
    validated: true,
    important: false,
    replied: false,
    source: 'templates/minifolio',
    ip: '150:200:200:200'
  },
  {
    _id: 'sender03-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-3',
    subject: 'Hello three',
    email: 'test3@mail.com',
    message: 'Hello from sender 3.',
    createdDate: new Date(2016, 11 , 1, 12, 10, 2),
    read: false,
    validated: true,
    important: true,
    replied: false,
    source: 'project-mam',
    ip: '150:200:200:100'
  },
  {
    _id: 'sender04-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-4',
    subject: 'Hello Four',
    email: 'test4@mail.com',
    message: 'Hello from sender 4.',
    createdDate: new Date(2017, 11 , 1, 12, 10, 2),
    read: false,
    validated: false,
    important: false,
    replied: true,
    source: 'project-mam',
    ip: '150:200:200:150'
  },
  {
    _id: 'sender05s-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-5',
    subject: 'Hello Five',
    email: 'test5@mail.com',
    message: 'Hello from sender 5.',
    createdDate: new Date(2018, 11 , 1, 12, 10, 2),
    read: false,
    validated: false,
    important: false,
    replied: false,
    source: 'project-mam',
    ip: '150:200:200:50'
  },
  {
    _id: 'sender06-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-6',
    subject: 'Hello Six',
    email: 'test6@mail.com',
    message: 'Hello from sender 6.',
    createdDate: new Date(2018, 1, 29, 13, 10, 2),
    read: false,
    validated: true,
    important: true,
    replied: true,
    source: 'templates/deft',
    ip: '150:200:200:250'
  },
  {
    _id: 'sender07-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-7',
    subject: 'Hello Seven',
    email: 'test7@mail.com',
    message: 'Hello from sender 7.',
    createdDate: new Date(2018, 1, 28, 12, 10, 2),
    read: false,
    validated: true,
    important: false,
    replied: false,
    source: 'templates/minifolio',
    ip: '150:200:200:200'
  },
  {
    _id: 'sender08-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-8',
    subject: 'Hello Eight',
    email: 'test8@mail.com',
    message: 'Hello from sender 8.',
    createdDate: new Date(2017, 10 , 1, 12, 10, 2),
    read: false,
    validated: true,
    important: true,
    replied: false,
    source: 'project-mam',
    ip: '150:200:200:100'
  },
  {
    _id: 'sender09-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-9',
    subject: 'Hello Nine',
    email: 'test9@mail.com',
    message: 'Hello from sender 9.',
    createdDate: new Date(2018, 1, 9, 12, 10, 2),
    read: false,
    validated: false,
    important: false,
    replied: true,
    source: 'project-mam',
    ip: '150:200:200:150'
  },
  {
    _id: 'sender10-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-10',
    subject: 'Hello Ten',
    email: 'test10@mail.com',
    message: 'Hello from sender 10.',
    createdDate: new Date(2018, 11, 2, 12, 10, 2),
    read: false,
    validated: false,
    important: false,
    replied: false,
    source: 'project-mam',
    ip: '150:200:200:50'
  },
  {
    _id: 'sender11-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-11',
    subject: 'Hello One',
    email: 'test11@mail.com',
    message: 'Hello from sender 11.',
    createdDate: new Date(2012, 11, 2, 12, 10, 2),
    read: false,
    validated: true,
    important: true,
    replied: true,
    source: 'templates/deft',
    ip: '150:200:200:250'
  },
  {
    _id: 'sender12-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-12',
    subject: 'Hello Twelve',
    email: 'test12@mail.com',
    message: 'Hello from sender 12.',
    createdDate: new Date(2014, 11 , 1, 12, 10, 2),
    read: false,
    validated: true,
    important: false,
    replied: false,
    source: 'templates/minifolio',
    ip: '150:200:200:200'
  },
  {
    _id: 'sender13-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-13',
    subject: 'Hello Thirteen',
    email: 'test13@mail.com',
    message: 'Hello from sender 13.',
    createdDate: new Date(2016, 11 , 1, 12, 10, 2),
    read: false,
    validated: true,
    important: true,
    replied: false,
    source: 'project-mam',
    ip: '150:200:200:100'
  },
  {
    _id: 'sender14-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-14',
    subject: 'Hello Fourteen',
    email: 'test14@mail.com',
    message: 'Hello from sender 14.',
    createdDate: new Date(2017, 11 , 1, 12, 10, 2),
    read: false,
    validated: false,
    important: false,
    replied: true,
    source: 'project-mam',
    ip: '150:200:200:150'
  },
  {
    _id: 'sender15-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-15',
    subject: 'Hello Fifteen',
    email: 'test15@mail.com',
    message: 'Hello from sender 15.',
    createdDate: new Date(2018, 11 , 3, 12, 10, 2),
    read: false,
    validated: false,
    important: false,
    replied: false,
    source: 'project-mam',
    ip: '150:200:200:50'
  },
  {
    _id: 'sender16-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-16',
    subject: 'Hello Sixteen',
    email: 'test16@mail.com',
    message: 'Hello from sender 16.',
    createdDate: new Date(2012, 11 , 3, 12, 10, 2),
    read: false,
    validated: true,
    important: true,
    replied: true,
    source: 'templates/deft',
    ip: '150:200:200:250'
  },
  {
    _id: 'sender17-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-17',
    subject: 'Hello Seventeen',
    email: 'test17@mail.com',
    message: 'Hello from sender 17.',
    createdDate: new Date(2014, 11 , 3, 12, 10, 2),
    read: false,
    validated: true,
    important: false,
    replied: false,
    source: 'templates/minifolio',
    ip: '150:200:200:200'
  },
  {
    _id: 'sender18-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-18',
    subject: 'Hello Eighteen',
    email: 'test18@mail.com',
    message: 'Hello from sender 18.',
    createdDate: new Date(2016, 11 , 1, 12, 10, 2),
    read: false,
    validated: true,
    important: true,
    replied: false,
    source: 'project-mam',
    ip: '150:200:200:100'
  },
  {
    _id: 'sender19-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-1',
    subject: 'Hello One again',
    email: 'test1@mail.com',
    message: 'Hello from sender 1.',
    createdDate: new Date(2017, 11 , 1, 12, 10, 2),
    read: false,
    validated: false,
    important: false,
    replied: true,
    source: 'project-mam',
    ip: '150:200:200:150'
  },
  {
    _id: 'sender20-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-1',
    subject: 'Hello One again again',
    email: 'test1@mail.com',
    message: 'Hello from sender 1.',
    createdDate: new Date(2018, 11 , 4, 12, 10, 2),
    read: true,
    validated: false,
    important: false,
    replied: false,
    source: 'project-mam',
    ip: '150:200:200:50'
  },
  {
    _id: 'sender21-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-21',
    subject: 'Hello Twenty One',
    email: 'test21@mail.com',
    message: 'Hello from sender 21.',
    createdDate: new Date(2014, 11 , 4, 12, 10, 2),
    read: true,
    validated: true,
    important: false,
    replied: false,
    source: 'templates/minifolio',
    ip: '150:200:200:200'
  },
  {
    _id: 'sender22-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-22',
    subject: 'Hello Twenty Two',
    email: 'test22@mail.com',
    message: 'Hello from sender 22.',
    createdDate: new Date(2016, 11 , 1, 12, 10, 2),
    read: true,
    validated: true,
    important: true,
    replied: false,
    source: 'project-mam',
    ip: '150:200:200:100'
  },
];

module.exports = messages;