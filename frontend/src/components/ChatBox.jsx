const ChatBox = () => {
    return ( 
        <div>
            {/* <div className="head">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>About</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
            </div> */}

            <div>
                <div className="border m-10  shadow">
                    <div className="p-5 border-b text-2xl font-semibold text-gray-600">
                        ChatRoom
                    </div>

                    <div className="overflow-y-scroll p-5 bg-slate-100 text-gray-600 h-[20rem] font-normal text-lg items-end flex flex-col ">

                        {output.length > 0 &&
                            output.map((data, i) => (
                                <div
                                    className={`bg-orange-300 shadow-lg min-h-fit max-w-md rounded-lg mb-4 relative  flex p-3 ${user.id === data.id ? "justify-end" : "mr-auto"
                                        }`}
                                >
                                    {user.id === data.id ? (
                                        <>
                                            <p
                                                key={i}
                                                className={` px-3 py-1 rounded-full  text-black`}
                                            >
                                                {data.message}
                                            </p>
                                            <span className=" top-[-30px]  absolute rounded-full bg-orange-200 px-2 opacity-80 font-light text-md text-black">{user.fist_name}</span>
                                            <img
                                                className={`w-10 h-10 rounded-full ml-2`}
                                                src={`${user.profile_pic
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
                                                src={`${data.pic ? data.pic : "/img/default_avatar.png"
                                                    }`}
                                                alt=""
                                            />

                                            <p
                                                key={i}
                                                className={` px-3 py-1 rounded-full bg-slate-100`}
                                            >
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

        </div>
     );
}
 
export default ChatBox;