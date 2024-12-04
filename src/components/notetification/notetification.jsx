import React, { useState, useEffect } from "react";
import { Avatar, List, Popover, Badge, Skeleton, Divider, notification } from "antd";
import { BellOutlined } from "@ant-design/icons";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "./notification.css";
import { request } from "../../share/request";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { config } from "../../share/helper";
import UserService from "../../UserService/UserService";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


const Notification = () => {
  const [stompClient, setStompClient] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [isPopoverVisible, setIsPopoverVisible] = useState(false); // State for toggling popover visibility
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const userId = UserService.getUsername()
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

  const markAsRead = () => {
    request(`notification/markAsRead?userId=${userId}`, "put", {}).then((res) => {
      if (res) {
       console.log(res)
      }
    });
  };

  const getUnreadCount = () => {
    request(`notification/unreadCount?userId=${userId}`, "get", {}).then((res) => {
      if (res) {
       setUnreadCount(res.data)
      }
    });
  };

  const togglePopoverVisibility = () => {
    getList()
    setIsPopoverVisible((prevVisibility) => !prevVisibility); // Toggle popover visibility
    if (!isPopoverVisible) {
      markAsRead()
      setUnreadCount(0); // Reset unread count when popover is opened
    }
  };

  const getList = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    request(`notification/user?type=GENERAL&page=${page}&size=10&userId=${userId}`, "get", {}).then((res) => {
      if (res.code === 200) {
          setData((prevData) => [...prevData, ...res.data.data]);
          setHasMore(res.data.data.hasMore);
          setPage((prevPage) => {
            const newPage = prevPage + 1;
            console.log("Updating page to:", newPage); // Log new page value
            return newPage;
          });
          console.log(page)
          setLoading(false)
      }
    });
  };

  useEffect(() => {
    getList();
    getUnreadCount();
    const newClient = new Client({
      webSocketFactory: () => new SockJS(config.base_webSocket),
      onConnect: () => {
        newClient.subscribe("/topic/genMessage", (message) => {
          const newMessage = JSON.parse(message.body);
          console.log(newMessage);
          setUnreadCount((prevCount) => prevCount + 1);
          setData((prevData) => [newMessage, ...prevData]);
          notification.info({
            message: `Notification from ${newMessage.sender}`,
            description: newMessage.englishText || "You have a new notification!",
            placement: "topRight", // You can customize placement
          });
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
    <div
      id="scrollableDiv"
      style={{
        height: 300,
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={getList}
        hasMore={hasMore}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          className="notification-feed"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              // actions={[<a key="list-loadmore-edit">mask as read</a>]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<span>{item.sender}</span>}
                description={item.englishText || "Just now"}
              />
              <div style={{marginLeft:6}}>{dayjs().from(dayjs(item.dateTime))}</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
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
            color: "#fff",
            fontSize: 20,
          }}
        />
      </Badge>
    </Popover>
  );
};

export default Notification;
