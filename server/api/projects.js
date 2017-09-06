import express from 'express';
import bodyParser from 'body-parser';
import Project from '../db/schemas/Project';

const projectsApi = express.Router();

projectsApi.use(bodyParser.urlencoded({ extended: true }));

projectsApi.get('/v1/projects', (req, res) => {
  Project.find((err, projects) => {
    if (err) {
      res.status(500).send(err);
      return false;
    }

    console.log(`${projects.length} projects retreived!`);

    res.status(200).json(projects);

    return true;
  });
});

projectsApi.get('/v1/project/:projectId', (req, res) => {
  Project.findById(req.params.projectId, (err, project) => {
    if (err) {
      res.status(500).send(err);
      return false;
    }

    console.log('1 project retreived!');

    res.status(200).json(project);

    return true;
  });
});

projectsApi.post('/v1/project', (req, res) => {
  const newProject = new Project(req.body);

  console.log(`New project to be created: ${newProject}`);
  newProject.save((err, savedProject, numAffected) => {
    if (err || numAffected === 0) {
      res.status(500).send(err);
      return false;
    }

    console.log(`${numAffected} project saved to DB`);

    res.status(200).json(savedProject);

    return true;
  });
});

projectsApi.put('/v1/project/:projectId', (req, res) => {
  const query = { _id: req.params.projectId };
  req.body.lastUpdate = new Date();

  Project.updateOne(query, req.body, {}, (err, raw) => {
    if (err && raw.nModified !== 1) {
      res.status(500).send(err);
      return false;
    }

    console.log(raw);
    res.status(200).send(raw);
    return true;
  });
});

projectsApi.delete('/v1/project/:projectId', (req, res) => {
  const query = { _id: req.params.projectId };

  Project.deleteOne(query, (err) => {
    if (err) {
      res.status(500).send(err);
      return false;
    }

    Project.findOne(query, (findErr, findRes) => {
      if (findErr) {
        res.status(500).send(findErr);
        return false;
      }

      if (findRes === null) {
        console.log('Project Deleted!');
        res.status(200).send(findRes);
        return true;
      }

      res.status(500).send(new Error('Project not deleted'));
      return false;
    });

    return true;
  });
});

export default projectsApi;
