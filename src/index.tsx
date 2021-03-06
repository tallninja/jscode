import 'bulmaswatch/slate/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state';

import App from './components/App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
