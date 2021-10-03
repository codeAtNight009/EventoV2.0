import React, { useState,useEffect } from "react";

function PeopleInEvent() {
  const [people, setPeople] = useState([]);
  const pie = [{name:"Himalaya",image:"batman.jpg"},{name:"Pri",image:"Amy_Baker25.jpg"},{name:"Shivansh",image:"sample_image.png"}]  


useEffect(() => {
    if(pie.length > 3){
        setPeople(pie.slice(0,3));
        // setpeopleLeft(pie.length - 3);
      }else if(pie.length == 3){
        setPeople(pie);
      }else{
        setPeople(pie);
      }
}, [])
 


  return (
    <div>
      <div className="peopleInEvent">
        {people.length ? people.map((p,index) => <img src={p.image} key={p.name} className={`img${index+1}`} alt={p.name} /> ): ''}
        <p style={people.length !== 1 ? { marginLeft: "5px" } :  { marginLeft: "0px",  left:"35px", bottom:"-4px"}}>
          {people.length === 1 ? people[0].name + ' is in this event' : people.length === 2 ? people[0].name + " and " + people[1].name + " are in this event" : people.map(p => ' ' +  p.name ) + ' are in this event' } 
        </p> 
      </div>
    </div>
  );
}

export default PeopleInEvent;
