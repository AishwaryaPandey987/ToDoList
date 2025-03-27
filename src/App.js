// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './Components2/Navbar'; // Adjust the path as necessary
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, addTask, deleteTask, completeTask, loadTasks } from './Components/actions';
import ResetPasswordModal from './Components2/ResetPasswordModal'; // Import your ResetPasswordModal
import LoginModal from './Components2/LoginModal'; // Import your LoginModal
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router

function App() {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);
    const weather = useSelector(state => state.weather);
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const user = useSelector(state => state.user);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        dispatch(fetchWeather());
        dispatch(loadTasks());
    }, [dispatch]);

    const handleAddTask = () => {
        if (task) {
            dispatch(addTask(task, priority));
            setTask("");
            setPriority("Medium");
        }
    };

    const handleLogout = () => {
    
        dispatch({ type: 'LOGOUT' }); // Assuming you have a LOGOUT action in your Redux setup
    };

    return (
        <Router>
            <div className="container mt-5">
                <MyNavbar 
                    isLoggedIn={isLoggedIn} 
                    handleLogout={handleLogout} 
                    username={user ? user.name : ''}// Pass setUsername to MyNavbar
                    setErrorMessage={setErrorMessage} 
                    // Pass setErrorMessage to MyNavbar
                />
                {isLoggedIn ? (
                    <>
                        <h1 className="text-center">Your To-Do List</h1>
                        <div className="input-group mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={task}
                                onChange={(e) => setTask(e.target.value)} 
                                placeholder="Add a new task" 
                            />
                            <select 
                                className="form-select" 
                                value={priority} 
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
                        </div>
                        <div>
                        {tasks.map((t, index) => (
                      <div 
                         key={index} 
                               className="d-flex justify-content-between align-items-center border p-2 mb-2" 
                               style={{ backgroundColor: 'white' }} // Set background color to white
    >
                                 <span className={t.completed ? 'text-decoration-line-through' : ''}>
                                      {t.text} (Priority: {t.priority})
                                    </span>
                                    {t.isOutdoor && weather && (
                            <div>
                               <p>Weather: {Math.round(weather.main.temp)}°C, {weather.weather[0].description}</p>
                               </div>
                                   )}
                                
                            
                                    <div>
                                        <button className="btn btn-success btn-sm me-2" onClick={() => dispatch(completeTask(index))}>✔️</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteTask(index))}>❌</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <h1 className="text-center">Please log in to access your To-Do List</h1>
                )}
                <LoginModal 
                    show={showLoginModal} 
                    handleClose={() => setShowLoginModal(false)} 
                    setUsername={(name)=>{}}
                    setShowLoginModal={setShowLoginModal} // Pass setShowLoginModal to close the modal
                    setErrorMessage={setErrorMessage} // Pass setErrorMessage to handle errors
                />
                <ResetPasswordModal 
                    show={showResetModal} 
                    handleClose={() => setShowResetModal(false)} 
                    handleReset={() => {}} // Implement your reset password logic here
                />
            </div>
        </Router>
    );
}

export default App;