import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from './components/ui/MaterialTitlePanel';
import AdminSidebarContent from './components/ui/AdminSidebarContent';
import Projects from './components/ui/Admin/Content';

import Blog from './components/ui/Admin/Blog';
import Messages from './components/ui/Admin/Messages';
import SiteStats from './components/ui/Admin/SiteStatistics';
import Gallery from './components/ui/Admin/Gallery';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    padding: '16px',
    backgroundColor: '#dadee5',
  },
};

const mql = window.matchMedia('(min-width: 800px');

class AdminContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mql,
      docked: false,
      open: false,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql,
      docked: mql.matches,
    });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetOpen(open) {
    this.setState({ open });
  }

  mediaQueryChanged() {
    this.setState({
      mql,
      docked: this.state.mql.matches,
    });
  }

  toggleOpen(ev) {
    this.setState({ open: !this.state.open });

    if (ev) {
      ev.preventDefault();
    }
  }

  render() {
    const sidebar = <AdminSidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked &&
        <a onClick={this.toggleOpen.bind(this)} href="#press" style={styles.contentHeaderMenuLink}>=</a>}
        <span> ProjectMaM Site Administration</span>
      </span>
    );

    const siderbarProps = {
      sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    };

    return (
      <Sidebar {...siderbarProps}>
        <MaterialTitlePanel title={contentHeader}>
          <div style={styles.content}>
            <Switch>
              <Route exact path="/" component={() => <Redirect from="/" to="/projects" />} />
              <Route path="/projects" component={Projects} />
              <Route path="/blog" component={Blog} />
              <Route path="/images" component={Gallery} />
              <Route path="/messages" component={Messages} />
              <Route path="/statistics" component={SiteStats} />
            </Switch>
          </div>
        </MaterialTitlePanel>
      </Sidebar>
    );
  }
}

const RoutedApp = () => (
  <HashRouter>
    <AdminContainer />
  </HashRouter>
);

render(
  <RoutedApp />,
  document.getElementById('contents'),
);
