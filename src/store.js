import { createStore, combineReducers } from "redux"
import leftSidebarReducer from "./reducers/left-side-bar-reducer"
import homePageReducer from "./reducers/home-page-reducer"
import paginationRouteReducer from "./reducers/pagination-routes-reducer"
import searchInputReducer from "./reducers/input-search-reducer"


const reducers = combineReducers({
  leftSidebarReducer,
  homePageReducer,
  paginationRouteReducer,
  searchInputReducer
})

const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;