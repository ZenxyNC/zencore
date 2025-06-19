import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userGreeting.css';
import { _ASSETS } from '../../../../../../../login/secured-login/loginAssets';

export default function UserGreeting() {
  var navigate = useNavigate();
  const [userInfo] = useState(getSavedInfo());
  const [timeInfo, setTimeInfo] = useState(getTime("self-request"))

  function getSavedInfo() {
    var userdata_object
    try {
      const userInfo_parsed = JSON.parse(localStorage.getItem('zenapps-global-id'))
      const [get_fname, get_lname] = userInfo_parsed.id.split(" ")
      userdata_object = {
        names: {
          fullname : userInfo_parsed.id,
          fname : get_fname,
          lname : get_lname
        },
        license: _ASSETS[userInfo_parsed.id].credentials.license,
        email: _ASSETS[userInfo_parsed.id].credentials.email,
        phone: _ASSETS[userInfo_parsed.id].credentials.phone,
      }
    } catch (err) {
      navigate('/zencore/login')
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
      if(request === "date") {
        if(current.getDate() < 10) {
          return "0" + current.getDate()
        }
        return current.getDate()
      } else if (request === "hour") {
        if(current.getHours() < 10) {
          return "0" + current.getHours()
        }
        return current.getHours()
      } else if (request === "minute") {
        if(current.getMinutes() < 10) {
          return "0" + current.getMinutes()
        }
        return current.getMinutes()
      }
    }

    var timeInfo_object = {
        dayName: current.toLocaleDateString('en-US', { weekday: 'short' }),
        date: formatTime('date'),
        month: current.getMonth(),
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