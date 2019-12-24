import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import leftSidebarReducer from "./reducers/left-side-bar-reducer";
import movieDataReducer from "./reducers/movie-data-reducer";
import searchInputReducer from "./reducers/input-search-reducer";
import commentariesReducer from "./reducers/commentaries-reducer";
import userReducer from "./reducers/user-reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//  reusing reducers logic
function createNamedWrapperReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { name } = action;
    const isInitializationCall = state === undefined;
    if (name !== reducerName && !isInitializationCall) {
      return state;
    }

    return reducerFunction(state, action);
  };
}

const reducers = combineReducers({
  leftSidebarReducer,
  userReducer,
  homePage: createNamedWrapperReducer(movieDataReducer, "home-page"),
  favoritePage: createNamedWrapperReducer(movieDataReducer, "favorite-page"),
  paginationRoute: createNamedWrapperReducer(
    movieDataReducer,
    "pagination-route"
  ),
  moviePage: createNamedWrapperReducer(movieDataReducer, "movie-page"),
  searchInputReducer,
  commentariesReducer
});

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(reduxThunk))
);

export default store;
