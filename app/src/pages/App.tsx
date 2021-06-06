import React, { useEffect } from 'react';
import { replace } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';

import Page from './Page';
import { link, meta, title } from './assets';
import routes from '../routes/routes';

const App = () => (
    <Page title={title} meta={meta} link={link}>
        {renderRoutes(routes)}
    </Page>
);

export default App;
