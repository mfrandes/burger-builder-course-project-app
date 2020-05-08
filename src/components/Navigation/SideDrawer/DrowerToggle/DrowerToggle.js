import React from 'react';

import classes from './DrawerToggle.css';

const drowerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.open}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drowerToggle;