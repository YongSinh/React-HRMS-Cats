import React, { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Notification from "../../components/notetification/notetification";
import { Client } from "@stomp/stompjs";

const WebSocketComponent = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const newClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8089/ws"),
      onConnect: () => {
        newClient.subscribe("/topic/kafkaMessages", (message) => {
          const newMessage = JSON.parse(message.body);
          console.log(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]); // Add the received message to the state
        });
        // setConnectionStatus('Connected');
      },

      onStompError: (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });

    newClient.activate();

    // Disconnect when the component unmounts
    return () => {
      newClient.deactivate();
    };
  }, []);




  return (
    <div>
      <Notification/>
      <h3>Kafka Messages:</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>Type:</strong> {msg.type} <br />
            <strong>Content:</strong> {msg.content} <br />
            <strong>Sender:</strong> {msg.sender} <br />
            <strong>Session ID:</strong> {msg.sessionId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
