import React from 'react';
import { PageHeader } from 'react-bootstrap';

import mockProjects from '../../../server/db/mockProjects.json';

console.log(mockProjects.length);

const ProjectsPageHeader = () =>
  <PageHeader>Projects</PageHeader>;

class ProjectsViewer extends React.Component {
  static getProjects() {
    // fetch data from api.
  }

  constructor() {
    super();
    this.state = {
      projectInView: 0,
    };
  }

  render() {
    return (
      <div id="projects-viewer">
        <ProjectsPageHeader />
      </div>
    );
  }
}

export default ProjectsViewer;
