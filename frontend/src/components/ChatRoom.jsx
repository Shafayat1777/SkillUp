import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "../hooks/useAuthContext";

const ChatRoom = () => {
  const { user } = useAuthContext();
  const [sock, setSock] = useState(null);
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let socket;
    if (user) {
      socket = io.connect("http://localhost:4000");
      setSock(socket);
      // Listen for events
      socket.on("chat", (data) => {
        setOutput((prevMsg) => [
          ...prevMsg,
          { message: data.message, id: data.id, pic: data.pic },
        ]);
        setFeedback("");
      });

      socket.on("typing", (data) => {
        setFeedback(data.user);
        if (!data) setFeedback("");
      });
    }

    return () => {
      // Clean up the socket connection when the component unmounts
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);

  const handleSendMessage = () => {
    if (sock && message && user) {
      sock.emit("chat", { message, id: user.id, pic: user.profile_pic });
      setMessage("");
    }
  };

  const handleFeedback = (e) => {
    // console.log(feedback)
    sock.emit("typing", { user: user.fist_name });
  };

  return (
    <div>
      <div className="bg-white border h-[40rem] w-[22rem] flex flex-col justify-between shadow">
        <div className="p-5 border-b text-2xl font-semibold text-gray-600">
          ChatRoom
        </div>

        <div className="output p-5 text-gray-600 h-full font-normal text-lg items-end overflow-y-scroll flex flex-col justify-end">
          {output.length > 0 &&
            output.map((data, i) => (
              <div
                className={`border w-full flex p-2 ${
                  user.id === data.id ? "justify-end" : "mr-auto"
                }`}
              >
                {user.id === data.id ? (
                  <>
                    <p
                      key={i}
                      className="flex px-3 py-1 rounded-md bg-orange-500 text-white whitespace-normal overflow-wrap-normal"
                    >
                      {data.message}
                    </p>

                    <img
                      className={`w-10 h-10 rounded-full ml-2`}
                      src={`${
                        user.profile_pic
                          ? user.profile_pic
                          : "/img/default_avatar.png"
                      }`}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <img
                      className={`w-10 h-10 rounded-full mr-2`}
                      src={`${data.pic ? data.pic : "/img/default_avatar.png"}`}
                      alt=""
                    />
                    <p key={i} className="px-3 py-1 rounded-full bg-slate-100">
                      {data.message}
                    </p>
                  </>
                )}
              </div>
            ))}

          {feedback && (
            <div className={`flex mr-auto p-3 text-gray-400`}>
              <em>{feedback + " is typing..."}</em>
            </div>
          )}
        </div>

        <div className="border-t p-5 flex items-center">
          <textarea
            onKeyDown={(e) => handleFeedback(e)}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type something..."
            className="border rounded p-2 w-full resize-y" // Use the 'resize-y' class to allow vertical resizing
            rows={Math.min(Math.max(Math.ceil(message.length / 28), 1), 8)} // Limit to a maximum of 5 rows
            style={{ minHeight: "40px" }} // Optional: Set a minimum height
          />
          <div
            onClick={handleSendMessage}
            className=" ml-5 border rounded-full p-2 flex items-center justify-center hover:bg-orange-400 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="w-6 h-6 text-orange-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
