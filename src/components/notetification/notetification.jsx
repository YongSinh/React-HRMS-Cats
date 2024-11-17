import React, { useState, useEffect } from "react";
import { Avatar, List, Button, Popover, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "./notification.css";

const Notification = () => {
  const [stompClient, setStompClient] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [isPopoverVisible, setIsPopoverVisible] = useState(false); // State for toggling popover visibility
  const [unreadCount, setUnreadCount] = useState(0);
  const onClick = () => {
    if (message.length > 0) {
      const currentTime = new Date().toLocaleTimeString();
      setData((prevData) => [
        ...prevData,
        { 
          title: message,
          receivedTime: `${currentTime} ago`,
        },
      ]);
      setMessage("");
      alert("Notification added");
    }
  };

  const togglePopoverVisibility = () => {
    setIsPopoverVisible((prevVisibility) => !prevVisibility); // Toggle popover visibility
    if (!isPopoverVisible) {
      setUnreadCount(0); // Reset unread count when popover is opened
    }
  };

  useEffect(() => {
    const newClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8089/ws"),
      onConnect: () => {
        newClient.subscribe("/topic/genMessage", (message) => {
          const newMessage = JSON.parse(message.body);
          console.log(newMessage);
          setUnreadCount((prevCount) => prevCount + 1);
          setData((prevData) => [
            ...prevData,
            {
              title: newMessage.sender || "New Kafka Message",
              description: newMessage.englishText || "No content",
            },
          ]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"], frame.body);
      },
    });

    newClient.activate();
    setStompClient(newClient);

    return () => {
      newClient.deactivate();
    };
  }, []);

  const notificationFeed = (
    <List
      className="notification-feed"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item key={index}  actions={[<a key="list-loadmore-edit">mask as read</a>]}>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            title={<span>{item.title}</span>}
            description={item.description || "Just now"}
          />
        </List.Item>
      )}
    />
  );

  return (

      <Popover
        content={notificationFeed}
        title="Notifications"
        trigger="click"
        popupVisible={isPopoverVisible}
        onOpenChange={togglePopoverVisibility}
      >
        <Badge
          onClick={togglePopoverVisibility}
          count={unreadCount}
          offset={[10, 0]}
          color="red"
        >
          <BellOutlined
           style={{
            color: '#fff',
            fontSize:20
          }}
          />
        </Badge>
      </Popover>
  );
};

export default Notification;
