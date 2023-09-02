import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "../hooks/useAuthContext";

const About = () => {
  const { user } = useAuthContext();
  const [sock, setSock] = useState(null);
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (user) {
      const socket = io.connect("http://localhost:4000");
      setSock(socket);
      // Listen for events
      socket.on("chat", (data) => {
        setOutput((prevMsg) => [
          ...prevMsg,
          { message: data.message, id: data.id },
        ]);
        setFeedback("");
      });

      socket.on("typing", (data) => {
        setFeedback(data.user);
        if (!data) setFeedback("");
      });
    }
  }, [user]);

  const handleSendMessage = () => {
    if (sock && message) {
      sock.emit("chat", { message, id: user.id });
      setMessage("");
    }
  };

  const handleFeedback = (e) => {
    // console.log(feedback)
    sock.emit("typing", { user: user.fist_name });
  };

  return (
    <div>
      <div className="head">
        <Helmet>
          <meta charSet="utf-8" />
          <title>About</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      <div>
        <div className="border m-10 h-[48rem] flex flex-col">
          <div className="p-5 border-b text-2xl font-semibold text-gray-600">
            ChatRoom
          </div>
          <div className="flex-grow flex flex-col ">
            <div className="p-5 flex-grow flex text-gray-600 font-normal text-lg items-end overflow-auto">
              <div>
                {output.length > 0 && (
                  <div>
                    {output.map((data, i) => (
                      <p
                        key={i}
                        className={`mb-2 border px-3 py-1 rounded-full bg-slate-100 ${user.id===data.id? "bg-blue-500 text-white":""}`}
                      >
                        {data.message}
                      </p>
                    ))}
                  </div>
                )}
                {feedback && (
                  <div className="px-3 py-1 text-gray-400">
                    <em>{feedback + " is typing..."}</em>
                  </div>
                )}
              </div>
            </div>
            <div className="border-t p-5 flex items-center">
              <input
                onKeyDown={(e) => handleFeedback(e)}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Type something..."
                className="border rounded-full p-2 w-full"
              />
              <div
                onClick={handleSendMessage}
                className=" ml-5 border rounded-full p-2 flex items-center justify-center hover:bg-blue-400 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-400"
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
      </div>
    </div>
  );
};

export default About;
