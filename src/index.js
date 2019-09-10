import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import GoodKinoService from "./services";
import { GoodKinoServiceProvider } from "./components/good-kino-service-context"

import store from "./store"

const goodKinoService = new GoodKinoService();


ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<GoodKinoServiceProvider value={goodKinoService}>
				<Router>
					<App />
				</Router>
			</GoodKinoServiceProvider>
		</ErrorBoundry>
	</Provider>
	, document.getElementById('root'));