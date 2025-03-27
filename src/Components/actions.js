// actions.js
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FETCH_WEATHER = 'FETCH_WEATHER';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const LOAD_TASKS = 'LOAD_TASKS';

export const fetchWeather = () => async (dispatch) => {
    const city = "New York"; // Fixed city name
    const apiKey = process.env.REACT_APP_API_KEY; // Access the API key
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        dispatch({ type: FETCH_WEATHER, payload: data });
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
};

export const addTask = (task, priority) => (dispatch, getState) => {
    const newTask = { text: task, completed: false, priority: priority, isOutdoor: true };
    const tasks = getState().tasks;
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    dispatch({ type: ADD_TASK, payload: updatedTasks });
};

export const deleteTask = (index) => (dispatch, getState) => {
    const tasks = getState().tasks.filter((_, i) => i !== index);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    dispatch({ type: DELETE_TASK, payload: tasks });
};

export const completeTask = (index) => (dispatch, getState) => {
    const tasks = getState().tasks.map((task, i) => 
        i === index ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    dispatch({ type: COMPLETE_TASK, payload: tasks });
};

export const loadTasks = () => (dispatch) => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    dispatch({ type: LOAD_TASKS, payload: storedTasks });
};
export const login = (user) => ({
       type: LOGIN,
        payload: user,
    });
    
    export const logout = () => ({
        type: LOGOUT,
    });