import React from "react";
import axios from "axios";
import { useQuery } from "react-query";


const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`)
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
};

const DependentQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], () => fetchUserByEmail(email));
  const channelId = user?.data.channelId;

  const { data: channels } = useQuery(["courses", channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId
  });

  return (
    <div>
      {channels?.data.courses.map((channel) => {
        return <p key={channel}>{channel}</p>
      })}
    </div>
  );
};

export default DependentQueries;
