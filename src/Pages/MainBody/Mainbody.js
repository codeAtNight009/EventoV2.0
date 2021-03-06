import React, { useState, useEffect } from "react";
import "./Mainbody.css";
import CardScroller from "../../Components/CardScroller/CardScroller";
import axios from "axios";
import { Translate } from "@material-ui/icons";
import { Link } from 'react-router-dom'

function Mainbody() {
  const [liveEvents, setLiveEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [firstEvent,setFirstEvent] = useState(false);

  function setEventsInLocalstorage(liveEvents, completedEvents) {
    const allEvents = liveEvents.concat(completedEvents);
    localStorage.setItem("allEvents", JSON.stringify(allEvents));
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function fetchEvents() {
      const liveEventsData = axios.get("./events.json");
      const completedEventsData = axios.get("./events.json");
      setLoader(true);
      try {
        Promise.all([liveEventsData, completedEventsData]).then((values) => {
          setLiveEvents(values[0].data);
          setCompletedEvents(values[1].data);
          setLoader(false);
          setEventsInLocalstorage(values[0].data, values[1].data);
        });
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    }
    fetchEvents();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div
      style={
        loader
          ? {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }
          : {}
      }
    >
      {loader ? (
        <img
          src="loaderWifi.gif"
          style={{ width: "80px", height: "80px" }}
        ></img>
      ) : (
        <div
          className="mainBody"
        >
         {liveEvents.length !== 0 || completedEvents.length !==0 ? (
            <div>
              <div className="eventCardContainer" style={{ marginTop: "15px" }}>
            <h4 className="eventsCollectionName">Live Events</h4>
            <CardScroller events={liveEvents} />
          </div>
          <div
            className="eventCardContainer"
            style={{ marginTop: "40px", marginBottom: "60px" }}
          >
            <h4 className="eventsCollectionName">Completed Events</h4>
            <CardScroller events={completedEvents} />
          </div>
            </div> 
         ) : (<div
          class="addFirstEvent"
          title="Create a Collection"
        >
        <h5 style={{color:"#707070", fontSize:"18px", textAlign:"center"}}>Note : Complete your minimal KYC in <Link to="/profile" style={{textDecoration:"none",color:"#7566d8"}}>Profile </Link> page first to get started. </h5>
         <h3>Create Your First Event</h3>
         <p>Evento is a one stop solution for mangaing all types of events. <br /> <br /> Evento Helps you to :
           <br /><br />
           <ul>
             <li>Create Events</li>
             <li>Invite Participants into it</li>
             <li>Create And Assign Task</li>
             <li>Pay all Events related Payment from one place</li>
             <li>Keep Track of all the Transactions</li>
             <li>And so much more...</li>
           </ul>
          </p>
          <p className="callToAction" style={{marginBottom:"70px"}}>
           Event Management has never been this easy. <br /> So what are you waiting for ? <br /> <br /> <a href="#" style={{textDecoration:"none",color:"#244ed8"}}> Create your first event now</a>.
         </p>
         
        </div>) }
          {/* {(liveEvents.length === 0 && completedEvents.length === 0) &&  } */}
        </div>
      )}
    </div>
  );
}

export default Mainbody;
