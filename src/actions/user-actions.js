import {
  successMessage,
  errorMessage,
  warningMessage
} from "../utils/feed-back";
import { updateMovieRate } from "./movie-data-action";

export const fetchUserDataRequest = () => {
  return {
    type: "FETCH_USER_DATA_REQUEST"
  };
};

export const fetchUserDataSuccess = user => {
  return {
    type: "FETCH_USER_DATA_SUCCESS",
    payload: user
  };
};

export const fetchUserovieDataFailure = err => {
  return {
    type: "FETCH_USER_DATA_FAILURE",
    payload: err
  };
};

export const fetchUser = apiCall => () => dispatch => {
  dispatch(fetchUserDataRequest());
  apiCall()
    .then(({ data }) => {
      dispatch(fetchUserDataSuccess(data));
    })
    .catch(err => dispatch(fetchUserovieDataFailure(err)));
};

export const addMovieToFavorite = movieId => {
  return {
    type: "ADD_MOVIE_TO_FAVORITE",
    payload: movieId
  };
};
export const removeMovieFromFavorite = movieIndex => {
  return {
    type: "REMOVE_MOVIE_FROM_FAVORITE",
    payload: movieIndex
  };
};

export const appendMovieToFavorite = apiCall => movieId => dispatch => {
  apiCall(movieId)
    .then(() => {
      dispatch(addMovieToFavorite(movieId));
      successMessage("Успешно добавлено в закладки");
    })
    .catch(() =>
      errorMessage("Доступно только для авторизованных пользователей")
    );
};

export const excludeMovieFromFavorite = apiCall => {
  return (movieId, movieIndex) => {
    return dispatch => {
      apiCall(movieId)
        .then(() => {
          dispatch(removeMovieFromFavorite(movieIndex));
          successMessage("Успешно удалено из закладок");
        })
        .catch(() =>
          errorMessage("Доступно только для авторизованных пользователей")
        );
    };
  };
};

const addMovieToVoted = (movieId, rate) => {
  return {
    type: "ADD_MOVIE_TO_VOTED",
    payload: {
      movieId,
      rate
    }
  };
};

export const handleVoted = apiCall => (movieId, rate, isVoted) => dispatch => {
  if (isVoted) {
    return warningMessage("Вы уже голосовали!");
  }
  apiCall(rate, movieId)
    .then(() => {
      dispatch(addMovieToVoted(movieId, rate));
      dispatch(updateMovieRate(rate));
      successMessage("Голос добавлен! Спасибо");
    })
    .catch(() => errorMessage("Что-то пошло не так!!"));
};

export const addMovieToContinueWatch = movie => {
  return {
    type: "ADD_MOVIE_TO_CONTINUE_WATCHING",
    payload: movie
  };
};
export const toggleMovieStatusToWatched = (movieId, toggler) => {
  return {
    type: "UPDATE_STATUS_MOVIE_TO_WATCHED",
    payload: { movieId, toggler }
  };
};

export const handleToggleWatchStatus = apiCall => (
  movieId,
  toggler
) => dispatch => {
  apiCall(movieId, toggler)
    .then(() => dispatch(toggleMovieStatusToWatched(movieId, toggler)))
    .catch(() => warningMessage("Что-то пошло не так!!!"));
};

const deleteMovieContinueWatch = movieId => {
  return {
    type: "DELETE_MOVIE_CONTINUE_WATCH",
    payload: movieId
  };
};

export const handleDeleteMovieFromContinueWatch = apiCall => {
  return movieId => {
    return dispatch => {
      apiCall(movieId)
        .then(() => dispatch(deleteMovieContinueWatch(movieId)))
        .catch(() => warningMessage("Что-то пошло не так!!!"));
    };
  };
};

const changeAvatarRequest = () => {
  return {
    type: "CHANGE_AVATAR_REQUEST"
  };
};
const changeAvatarSuccess = avatar => {
  return {
    type: "CHANGE_AVATAR_SUCCESS",
    payload: avatar
  };
};
const changeAvatarFailure = () => {
  return {
    type: "CHANGE_AVATAR_FAILURE"
  };
};

export const handleUpdateAvatar = apiCall => formData => dispatch => {
  dispatch(changeAvatarRequest());
  apiCall(formData)
    .then(({ data }) => {
      dispatch(changeAvatarSuccess(data.url));
    })
    .catch(err => {
      dispatch(changeAvatarFailure());
      const {
        response: { data }
      } = err;
      warningMessage(data.message);
    });
};

const changeUsernameAction = username => {
  return {
    type: "CHANGE_USERNAME",
    payload: username
  };
};

export const changeUsername = apiCall => (
  prevUsername,
  validateFields,
  setFields
) => dispatch => {
  validateFields((errors, { username }) => {
    if (prevUsername === username) {
      return successMessage("username successfully changed");
    }
    if (errors) {
      return warningMessage("Plz write a valid username");
    }
    if (!username.trim()) {
      warningMessage("username can not be empty");
      setFields({
        username: {
          value: "",
          errors: [new Error()]
        }
      });
      return;
    }
    apiCall(username)
      .then(() => {
        dispatch(changeUsernameAction(username));
        successMessage("username successfully changed");
      })
      .catch(({ response: { data } }) => warningMessage(data.message));
  });
};
