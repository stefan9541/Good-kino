const initialState = {
  onSearchData: [],
  loading: true,
  visible: false,
  error: null
};

const searchInputReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_SEARCH_INPUT_REQUEST":
      return {
        onSearchData: [],
        loading: true,
        error: null
      };
    case "ON_SEARCH_INPUT_SUCCESS":
      return {
        onSearchData: action.payload,
        loading: false,
        error: null
      };

    case "ON_SEARCH_INPUT_REQUEST_FAILURE":
      return {
        onSearchData: [],
        loading: false,
        error: action.payload
      };
    case "SEARCH_ITEM_RESULT_VISIBLE":
      return {
        ...state,
        visible: action.payload
      };
    default:
      return state;
  }
};

export default searchInputReducer;
