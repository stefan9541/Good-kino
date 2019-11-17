import { createStore, combineReducers } from "redux";
import leftSidebarReducer from "./reducers/left-side-bar-reducer";
import movieDataReducer from "./reducers/movie-data-reducer";
import searchInputReducer from "./reducers/input-search-reducer";
import commentariesReducer from "./reducers/commentaries-reducer";
import userReducer from "./reducers/user-reducer";


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
  paginationRoute: createNamedWrapperReducer(movieDataReducer, "pagination-route"),
  moviePage: createNamedWrapperReducer(movieDataReducer, "movie-page"),
  searchInputReducer,
  commentariesReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
