const initialState = {
  commentaries: [],
  commentariesCount: 0,
  page: 0,
  hasMoreItems: true,
  loading: true,
  error: null,
  disableSubmitButton: true,
  visibleSubmitButton: false
};

function toogle(add, del, state, commentindex, userId, userIndex) {
  // add = in wich array we want to add userid
  // del = in wich array we want to delete userId
  // commentindex = commentariesIndex in state.commentaries
  // userIndex = userId index in the array in which we want to delete it
  return {
    ...state.commentaries[commentindex],
    [add]: [...state.commentaries[commentindex][add], userId],
    [del]: [
      ...state.commentaries[commentindex][del].slice(0, userIndex),
      ...state.commentaries[commentindex][del].slice(userIndex + 1)
    ]
  };
}

function likes(value, state, commentId, userId) {
  // if toogle === 1 its a like else dislike;
  const like = "likes";
  const dislike = "dislikes";
  const commentindex = state.commentaries.findIndex(el => el._id === commentId);
  const isHaveLike = state.commentaries[commentindex][like].indexOf(userId);
  const isHaveDislike = state.commentaries[commentindex][dislike].indexOf(
    userId
  );
  const isLiked = value === "likes" ? isHaveLike : isHaveDislike;

  if (isHaveDislike !== -1 && value === "likes") {
    // if we have userId in dislikes array and value === likes,
    // we need to delete userId in disliked array and add him in to likes array.
    return {
      ...state,
      commentaries: [
        ...state.commentaries.slice(0, commentindex),
        toogle(like, dislike, state, commentindex, userId, isHaveDislike),
        ...state.commentaries.slice(commentindex + 1)
      ]
    };
  }
  if (isHaveLike !== -1 && value === "dislikes") {
    // here we do the same action like a case on previous if block.
    // just the opposite
    return {
      ...state,
      commentaries: [
        ...state.commentaries.slice(0, commentindex),
        toogle(dislike, like, state, commentindex, userId, isHaveLike),
        ...state.commentaries.slice(commentindex + 1)
      ]
    };
  }
  if (isHaveLike === -1 && isHaveDislike === -1) {
    // here if we dont have a userId on dislikes and likes array,
    // we add him in to array wich === value, its likes or disliks.
    return {
      ...state,
      commentaries: [
        ...state.commentaries.slice(0, commentindex),
        {
          ...state.commentaries[commentindex],
          [value]: [...state.commentaries[commentindex][value], userId]
        },
        ...state.commentaries.slice(commentindex + 1)
      ]
    };
  }
  return {
    // here we delete a userId on array, if a value same
    ...state,
    commentaries: [
      ...state.commentaries.slice(0, commentindex),
      {
        ...state.commentaries[commentindex],
        [value]: [
          ...state.commentaries[commentindex][value].slice(0, isLiked),
          ...state.commentaries[commentindex][value].slice(isLiked + 1)
        ]
      },
      ...state.commentaries.slice(commentindex + 1)
    ]
  };
}

const commentariesReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case "FETCH_COMMENTARIES_REQUEST":
      return {
        ...state,
        commentaries: [],
        loading: true,
        error: null
      };
    case "FETCH_COMMENTARIES_SUCCESS":
      return {
        ...state,
        commentaries: payload,
        loading: false,
        error: null
      };
    case "FETCH_COMMENTARIES_FAILURE":
      return {
        ...state,
        commentaries: [],
        loading: false,
        error: payload
      };
    case "FETCH_NEW_ITEM_IF_NEEDED":
      return {
        ...state,
        hasMoreItems: action.payload
      };
    case "PAGE_OF_COMMENTARIES":
      return {
        ...state,
        page: state.page + 1
      };
    case "COMMENTARIES_COUNT":
      return {
        ...state,
        commentariesCount: action.payload
      };
    case "INC_COMMENTARIES_COUNT":
      return {
        ...state,
        commentariesCount: state.commentariesCount + 1
      };
    case "CONCAT_NEW_COMMENTARIES":
      return {
        ...state,
        commentaries: state.commentaries.concat(payload)
      };
    case "ADD_NEW_COMMENTAR":
      return {
        ...state,
        commentaries: [payload, ...state.commentaries]
      };
    case "DISABLE_SUBMIT_BUTTON":
      return {
        ...state,
        disableSubmitButton: payload
      };
    case "VISIBLE_SUBMIT_BUTTON":
      return {
        ...state,
        visibleSubmitButton: payload
      };
    case "TOOGLE_LIKE_OR_DISLIKE":
      const { toogle, userId, commentId } = action.payload;
      return likes(toogle, state, commentId, userId);
    default:
      return state;
  }
};

export default commentariesReducer;
