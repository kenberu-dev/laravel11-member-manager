import React from "react";

export const EventBusContext = React.createContext();

export const EventBusProvider = ({ children }) => {
  const [events, setEvents] = React.useState({});

  const emit = (name, data) => {
    console.log("This is emit");
    console.log("emit events",events[name]);
    if (events[name]) {
      for (let cb of events[name]) {
        cb(data);
      }
    }
  }

  const on = (name, cb) => {
    console.log("This is on");
    if(!events[name]) {
      events[name] = [];
    }

    events[name].push(cb);
    console.log("on events",events[name]);

    return () => {
      events[name] = events[name].filter((callback) => callback !== cb);
    }
  }

  return (
    <EventBusContext.Provider value={{emit, on}}>
      { children }
    </EventBusContext.Provider>
  );
}

export const useEventBus = () => {
  return React.useContext(EventBusContext);
}
