import React from 'react';
import { render } from 'react-dom';

import Header from './components/ui/Header';
import ProjectsViewer from './components/ui/Projects';

const App = () => (
  <div>
    <Header />
    <ProjectsViewer />
  </div>
);

render(
  <App />,
  document.getElementById('contents'),
);
