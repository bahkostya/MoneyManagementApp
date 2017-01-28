import ReactDOM from 'react-dom';
import React from 'react';
import MoneyPalApp from './components/MoneyPalApp';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
    <MoneyPalApp />,
    document.getElementById('root')
);
