'use strict';

const messages = [
  {
    _id: 'sender01-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-1',
    subject: 'Hello One',
    email: 'test1@mail.com',
    message: 'Hello from sender 1.',
    createdDate: new Date(2012, 11 , 1, 12, 10, 2),
    validated: false,
    important: false,
    replied: false,
    source: 'templates/deft'
  },
  {
    _id: 'sender02-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-2',
    subject: 'Hello Two',
    email: 'test2@mail.com',
    message: 'Hello from sender 2.',
    createdDate: new Date(2014, 11 , 1, 12, 10, 2),
    validated: false,
    important: false,
    replied: false,
    source: 'templates/minifolio'
  },
  {
    _id: 'sender03-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-3',
    subject: 'Hello three',
    email: 'test3@mail.com',
    message: 'Hello from sender 3.',
    createdDate: new Date(2016, 11 , 1, 12, 10, 2),
    validated: false,
    important: false,
    replied: false,
    source: 'project-mam'
  },
  {
    _id: 'sender04-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-4',
    subject: 'Hello Four',
    email: 'test4@mail.com',
    message: 'Hello from sender 4.',
    createdDate: new Date(2017, 11 , 1, 12, 10, 2),
    validated: false,
    important: false,
    replied: false,
    source: 'project-mam'
  },
  {
    _id: 'sender05s-3c83-4b4b-9089-69362f729ae7',
    sender: 'Sender-5',
    subject: 'Hello Five',
    email: 'test5@mail.com',
    message: 'Hello from sender 5.',
    createdDate: new Date(2018, 11 , 1, 12, 10, 2),
    validated: false,
    important: false,
    replied: false,
    source: 'project-mam'
  },
];

module.exports = messages;