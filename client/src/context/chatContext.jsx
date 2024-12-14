import axios from "axios";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    //const [prompt, setPrompt] = useState("");
    const [newRequestLoading, setNewRequestLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch chats when the provider mounts
    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/chat/all`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setChats(data);
            if (data.length > 0) setSelected(data[0]._id);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchResponse = async (currentPrompt) => {
        setNewRequestLoading(true);
    
        // Ensure the prompt is not empty before sending
        if (!currentPrompt.trim()) {
            alert("Question cannot be empty.");
            setNewRequestLoading(false);
            return;
        }
    
        try {
            const response = await axios.post(
                "https://generativelanguage.googleapis.com/v1beta/tunedModels/medical-inventory-chatbot-gjibwp8x7p4x:generateContent",
                {
                    contents: [{ parts: [{ text: currentPrompt }] }],
                },
                {
                    params: { key: "AIzaSyCv-dtfw7pBPSEPBY809oL2lmwutbk2dRo" },
                }
            );
    
            const answer = response.data.candidates[0].content.parts[0].text;
    
            const message = {
                question: currentPrompt, // Using the passed prompt
                answer: answer,
            };
    
            // Update the messages state with the new message
            setMessages((prev) => [...prev, message]);
    
            // Save the conversation to the backend
            await axios.post(
                `http://localhost:8080/api/chat/${selected}`,
                { question: currentPrompt, answer: answer },
                {
                    headers: { token: localStorage.getItem("token") },
                }
            );
        } catch (error) {
            alert("Something went wrong: " + (error.response?.data?.message || error.message));
            console.log(error);
        } finally {
            setNewRequestLoading(false);
        }
    };
    

    const createChat = async () => {
        setIsCreatingChat(true);
        try {
            await axios.post(
                `http://localhost:8080/api/chat/new`,
                {},
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            await fetchChats(); // Fetch chats after creating a new chat
        } catch (error) {
            toast.error("Something went wrong: " + error.message);
        } finally {
            setIsCreatingChat(false);
        }
    };

    const fetchMessages = useCallback(async () => {
        if (!selected) return;
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:8080/api/chat/${selected}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setMessages(data);
        } catch (error) {
            toast.error("Something went wrong: " + error.message);
        } finally {
            setLoading(false);
        }
    }, [selected]);

    const deleteChat = async (chatId) => {
        try {
            await axios.delete(`http://localhost:8080/api/chat/${chatId}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setChats((prev) => prev.filter((chat) => chat._id !== chatId));
            if (selected === chatId) setSelected(null);
        } catch (error) {
            toast.error("Something went wrong: " + error.message);
        }
    };

    return (
        <ChatContext.Provider
            value={{
                createChat,
                deleteChat,
                chats,
                selected,
                setSelected,
                isCreatingChat,
                fetchMessages,
                loading,
                fetchResponse,
                //setPrompt,
                messages,
                newRequestLoading,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

ChatProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const ChatData = () => {
    return useContext(ChatContext);
};
