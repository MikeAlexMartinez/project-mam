import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'whatwg-fetch';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Delete, ModeEdit } from 'material-ui-icons';
import Switch from 'material-ui/Switch';
import Favourite from '../Favourite';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  tableHeader: {
    textAlign: 'center',
  },
});

class ProjectTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/v1/projects').then((response) => {
      if (response.ok) {
        response.json().then((projects) => {
          projects.forEach((project) => {
            project.lastUpdate = moment(new Date(project.lastUpdate));
            project.createdDate = moment(new Date(project.createdDate));
          });
          this.setState({ projects: [...projects] });
        });
      } else {
        response.json().then((error) => {
          // Implement proper error handling
          alert(`Failed to fetch issues ${error.message}`);
        });
      }
    }).catch((err) => {
      // Implement proper error handling
      alert(`Error in fetching data from server: ${err}`);
    });
  }

  render() {
    const projects = this.state.projects;

    const headers = ['Project Name', 'Public', 'Git Repository', 'Favourite', 'Last Update', 'Edit', 'Delete'];

    return (
      <Paper className={this.props.classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(h => <TableCell className={this.props.classes.paper}>{h}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((p) => {
              return (
                <TableRow key={p._id}>
                  <TableCell key={`${p._id}-title`}>
                    <div>{p.title}</div>
                  </TableCell>
                  <TableCell key={`${p._id}-public`}>
                    <div style={{ textAlign: 'center' }} ><Switch checked={p.public} /></div>
                  </TableCell>
                  <TableCell key={`${p._id}-git`}>
                    <div style={{ textAlign: 'center' }} ><a href={p.git}><img style={{ height: '24px' }} src="https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mark-github.svg" alt="github logo" /></a></div>
                  </TableCell>
                  <TableCell key={`${p._id}-fave`}>
                    <div style={{ textAlign: 'center' }}><Favourite selected={p.favourite} /></div>
                  </TableCell>
                  <TableCell key={`${p._id}-lastupdate`}>
                    <div>{p.lastUpdate.format('DD/MM/YYYY')}</div>
                  </TableCell>
                  <TableCell key={`${p._id}-edit`}>
                    <ModeEdit style={{ opacity: 0.5, textAlign: 'center' }} />
                  </TableCell>
                  <TableCell key={`${p._id}-delete`}>
                    <Delete style={{ fillOpacity: 0.5, strokeOpacity: 0.5, textAlign: 'center' }} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

ProjectTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectTable);
