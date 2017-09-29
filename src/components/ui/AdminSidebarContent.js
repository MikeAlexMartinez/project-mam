/* eslint react/require-default-props:0 */

import React from 'react';
import PropTypes from 'prop-types';
import MaterialTitlePanel from './MaterialTitlePanel';
import spreadObject from '../../helpers/spreadObject';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  siderbarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  },
};

const AdminSidebarContent = (props) => {
  const style = props.style ? spreadObject(styles.sidebar, props.style) : styles.sidebar;

  const SidebarHeadings = ['Projects', 'Blog', 'Images', 'Messages', 'Statistics'];

  const links = SidebarHeadings.map(v => <a key={`${v}`} href={`#${v}`} style={styles.siderbarLink}>{v}</a>);

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        <a href="#view-site" style={styles.siderbarLink}>ProjectMaM</a>
        <div style={styles.divider} />
        {links}
      </div>
    </MaterialTitlePanel>
  );
};

AdminSidebarContent.propTypes = {
  style: PropTypes.object,
};

export default AdminSidebarContent;
