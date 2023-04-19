import React from 'react'
import { mockNotifications } from '../../mock'

function NotificationPage() {
  const Notifications = mockNotifications
  return (
    <div>
      {Notifications.map((item, index) => {
        return (
          <li key={index}>
            <div>
              <img src={item.courierAvatar} alt='' />
              <p>
                <span>{item.courierName}</span>
                <span>{item.courierSurname}</span>
              </p>
              <div>{item.orderId}</div>
              <p>{item.courierInfo}</p>
              <a href={`tel:${item.phoneNumber}`}>CLICK TO CALL</a>
            </div>
            <div>
              <p>
                <span>Your Delivery Time</span>
                <span>{item.deliveryTime}</span>
              </p>
              <p>
                <span>Your Delivery Address</span>
                <span>{item.deliveryAddress}</span>
              </p>
            </div>
          </li>
        )
      })}
    </div>
  )
}

export default NotificationPage
