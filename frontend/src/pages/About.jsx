// import { Helmet } from "react-helmet";
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import { useAuthContext } from "../hooks/useAuthContext";
import AboutSection from "../components/AboutSection";


const About = () => {
  // const { user } = useAuthContext();
  // const [sock, setSock] = useState(null);
  // const [message, setMessage] = useState("");
  // const [output, setOutput] = useState([]);
  // const [feedback, setFeedback] = useState("");

  // useEffect(() => {
  //   let socket;
  //   if (user) {
  //     socket = io.connect("http://localhost:4000");
  //     setSock(socket);
  //     // Listen for events
  //     socket.on("chat", (data) => {
  //       setOutput((prevMsg) => [
  //         ...prevMsg,
  //         { message: data.message, id: data.id, pic: data.pic },
  //       ]);
  //       setFeedback("");
  //     });

  //     socket.on("typing", (data) => {
  //       setFeedback(data.user);
  //       if (!data) setFeedback("");
  //     });
  //   }

  //   return () => {
  //     // Clean up the socket connection when the component unmounts
  //     if (socket) {
  //       socket.disconnect();
  //     }
  //   };
  // }, [user]);

  // const handleSendMessage = () => {
  //   if (sock && message && user) {
  //     sock.emit("chat", { message, id: user.id, pic: user.profile_pic, user_name: user.fist_name });
  //     setMessage("");
  //   }
  // };

  // const handleFeedback = (e) => {
  //   // console.log(feedback)
  //   sock.emit("typing", { user: user.fist_name });
  // };

  return (
    <AboutSection/>
  );
};

export default About;
