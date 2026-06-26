import { useState } from 'react';
import './userGreeting.css';

export default function UserGreeting() {
  const [userInfo] = useState(getSavedInfo());
  const [timeInfo, setTimeInfo] = useState(getTime("self-request"))

  function getSavedInfo() {
    var userdata_object
    try {
      const userInfo_parsed = JSON.parse(localStorage.getItem('zencore-user-info'))
      userdata_object = {
        names: {
          fullname: userInfo_parsed.username,
          fname: userInfo_parsed.first_name,
          lname: userInfo_parsed.last_name
        },
        email: userInfo_parsed.email,
        phone: userInfo_parsed.phone,
      }
    } catch (err) {
      
    }

    return userdata_object
  }

  function getTime(method) {
    const current = new Date();
    const currentHour = current.getHours();

    // Determine greeting based on hour
    let greeting;
    if (currentHour >= 0 && currentHour <= 10) {
      greeting = "Good Morning";
    } else if (currentHour >= 11 && currentHour <= 17) {
      greeting = "Good Afternoon";
    } else if (currentHour >= 18 && currentHour <= 23) {
      greeting = "Good Night";
    }

    function formatTime(request) {
      if (request === "date") {
        if (current.getDate() < 10) {
          return "0" + current.getDate()
        }
        return current.getDate()
      } else if (request === "hour") {
        if (current.getHours() < 10) {
          return "0" + current.getHours()
        }
        return current.getHours()
      } else if (request === "minute") {
        if (current.getMinutes() < 10) {
          return "0" + current.getMinutes()
        }
        return current.getMinutes()
      }
    }

    var timeInfo_object = {
      dayName: current.toLocaleDateString('en-US', { weekday: 'short' }),
      date: formatTime('date'),
      month: current.getMonth() + 1,
      year: current.getFullYear(),
      hour: formatTime('hour'),
      minute: formatTime('minute'),
      greeting: greeting  // Added greeting property
    };

    if (method === "self-request") {
      return timeInfo_object;
    } else if (method === "auto-request") {
      setTimeInfo(timeInfo_object);
    }
  }
  return (
    <>
      <div className='componentbody' id='userGreeting-body'>
        <div id='greetings'>
          {timeInfo?.greeting}, <br />{userInfo?.names.fname}.
        </div>
        <div id='userGreeting-time'>
          <div id='clock'>
            {timeInfo?.hour}:{timeInfo?.minute}
          </div>
          <div id='date'>
            {timeInfo?.dayName}, {timeInfo?.date}/{timeInfo?.month}/{timeInfo?.year}
          </div>
        </div>
      </div>
    </>
  )
}