import React from 'react';
const Notification = ({showAlert, alertUser }) => {
    return(
        <h2 className={showAlert ? "notifAlert" : ""} onClick={alertUser}>{showAlert ? "1 Notification" : "0 Notifications"}</h2> 
    )
}   

export default Notification