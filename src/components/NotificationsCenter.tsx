import React, { useState, useEffect } from 'react';

interface Notification {
  id: number;
  type: string;
  message: string;
  timestamp: string;
}

const NotificationsCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Notifications Center</h2>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li key={notification.id} className="p-2 border rounded bg-gray-100">
            <div className="flex justify-between">
              <span className="font-medium">{notification.type}</span>
              <span className="text-sm text-gray-500">{notification.timestamp}</span>
            </div>
            <p>{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsCenter;
