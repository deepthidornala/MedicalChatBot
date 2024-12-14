import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ChatProvider } from "./context/chatContext"; // Import the ChatProvider

function App() {
    const user = localStorage.getItem("token");

    return (
        <ChatProvider> {/* Wrap the routes in ChatProvider */}
            <Routes>
                {user && <Route path="/" exact element={<Home />} />}
                <Route path="/signup" exact element={<Signup />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
        </ChatProvider>
    );
}

export default App;
