import { useEffect, useState } from "react";
import { FiLogOut, FiTrash2, FiPlus } from "react-icons/fi";
import { FaRegUserCircle } from 'react-icons/fa';
import { RiRobot2Line } from "react-icons/ri";
import { ChatData } from "../context/chatContext";

const Home = () => {
    const {
        createChat,
        deleteChat,
        chats,
        selected,
        setSelected,
        isCreatingChat,
        fetchMessages,
        loading,
        fetchResponse,
        messages,
        newRequestLoading,
    } = ChatData();

    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        if (selected) {
            fetchMessages();
        }
    }, [selected, fetchMessages]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const handleNewChat = async () => {
        await createChat();
    };

    const handleChatSelect = (chatId) => {
        setSelected(chatId);
    };

    const handleClearConversations = async () => {
        if (selected) {
            await deleteChat(selected);
        }
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendPrompt = async () => {
        if (userInput.trim() === "") {
            alert("Please enter a prompt.");
            return;
        }

        // Pass the user input directly to fetchResponse
        await fetchResponse(userInput);

        // Clear the input field after fetching the response
        setUserInput(""); 
    };

    return (
        <div className="h-screen flex flex-col bg-gray-900 text-white">
            <header className="flex items-center justify-center py-4 bg-gray-900 border-b border-gray-700">
                <h1 className="text-2xl font-bold">MediStockBot</h1>
            </header>

            <div className="flex flex-1">
                <aside className="w-64 bg-gray-800 flex flex-col p-4 space-y-4 justify-between">
                    <div>
                        <button
                            onClick={handleNewChat}
                            className="text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md text-left flex items-center space-x-2"
                            disabled={isCreatingChat}
                        >
                            <FiPlus />
                            <span>{isCreatingChat ? "Creating..." : "New chat"}</span>
                        </button>

                        <ul className="mt-4 space-y-2 overflow-y-auto">
                            {chats.length === 0 ? (
                                <li className="text-gray-400 py-2">No chats available</li>
                            ) : (
                                chats.map((chat) => (
                                    <li
                                        key={chat._id}
                                        className={`mb-2 bg-gray-700 p-3 rounded-md cursor-pointer 
                                          ${selected === chat._id ? "bg-gray-600" : ""}`}
                                        onClick={() => handleChatSelect(chat._id)}
                                    >
                                        <p>{chat.latestMessage || "New Chat"}</p>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={handleClearConversations}
                            className="text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md flex items-center space-x-2"
                        >
                            <FiTrash2 />
                            <span>Clear conversations</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-600 hover:bg-red-500 py-2 px-4 rounded-md flex items-center space-x-2"
                        >
                            <FiLogOut />
                            <span>Log out</span>
                        </button>
                    </div>
                </aside>

                <main className="flex-1 flex flex-col items-center bg-gray-900 p-4">
                    <div className="w-full max-w-[90%] bg-gray-800 p-6 rounded-lg">
                        {selected ? (
                            <>
                                {loading ? (
                                    <p className="text-gray-400">Loading messages...</p>
                                ) : (
                                  <ul className="space-y-4">
                                  {messages.length === 0 ? (
                                      <li className="text-gray-400">No messages yet.</li>
                                  ) : (
                                      messages.map((message, index) => (
                                          <li key={index} className="text-white flex items-start space-y-2 flex-col">
                                              <div className="flex items-center space-x-2">
                                                  <FaRegUserCircle className="text-lg" />
                                                  <span>{message.question}</span>
                                              </div>
                                              <div className="flex items-center space-x-2">
                                                  <RiRobot2Line className="text-lg" />
                                                  <span>{message.answer}</span>
                                              </div>
                                          </li>
                                      ))
                                  )}
                              </ul>
                                )}

                                <div className="mt-4">
                                    <input
                                        type="text"
                                        value={userInput}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSendPrompt();
                                            }
                                        }}
                                        placeholder="Type your prompt here..."
                                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                                    />
                                    <button
                                        onClick={handleSendPrompt}
                                        className="mt-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white"
                                        disabled={newRequestLoading}
                                    >
                                        {newRequestLoading ? "Sending..." : "Send"}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-400">No chat selected.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
