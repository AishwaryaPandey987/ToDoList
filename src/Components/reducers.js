// reducers.js
import { LOGIN, LOGOUT,FETCH_WEATHER, ADD_TASK, DELETE_TASK, COMPLETE_TASK, LOAD_TASKS } from './actions';

const initialState = {
    isLoggedIn: false,
    user: null,
    tasks: [],
    weather: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload, // Store user info if needed
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
        case FETCH_WEATHER:
            return { ...state, weather: action.payload };
        case LOAD_TASKS:
            return { ...state, tasks: action.payload };
        case ADD_TASK:
            return { ...state, tasks: action.payload };
        case DELETE_TASK:
            return { ...state, tasks: action.payload };
        case COMPLETE_TASK:
            return { ...state, tasks: action.payload };
        default:
            return state;
    }
};

export default rootReducer;