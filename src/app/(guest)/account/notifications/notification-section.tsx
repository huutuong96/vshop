'use client'

import { useNotification } from '@/context-apis/notification-provider';
import React, { useContext, useEffect } from 'react';


const NotificationSection = () => {
  const { notifications, loadedNotifications, fetchNotifications, hasMore } = useNotification();
  const [loading, setLoading] = React.useState(false);

  // useEffect(() => {
  //   fetchNotifications(false); // Lấy thông báo ban đầu khi component mount
  // }, [fetchNotifications]);

  const handleLoadMore = () => {
    if (!loading) {
      setLoading(true);
      fetchNotifications(true); // Tải thêm thông báo khi nhấn "Xem thêm"
    }
  };



  return (
    <div className="container w-full">
      <h1 className="text-xl font-semibold mb-4">Thông báo</h1>

      {loading && <p>Đang tải thông báo...</p>}

      {notifications && (notifications.data.length > 0 || loadedNotifications.length > 0) ? (
        <ul className="space-y-2 w-full">
          {/* Hiển thị tất cả thông báo từ state gốc và các thông báo đã tải thêm */}
          {loadedNotifications.map((n: any) => (
            <div key={n.id} className='flex p-4 transition gap-4 border bg-white shadow-sm rounded-sm'>
              <div>
                <img src={n.image || ''} alt="" className='size-20' />
              </div>
              <div>
                <li>
                  <p className="font-semibold text-gray-800 mb-1">{n.title}</p>
                  <p className="text-xs text-gray-600">{n.description}</p>
                  <p className="text-[10px] text-gray-400 mt-2">
                    {new Date(n.created_at).toLocaleDateString()} - {new Date(n.created_at).toLocaleTimeString()}
                  </p>
                </li>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        !loading && <p className="text-gray-500">Hiện tại không có thông báo nào.</p>
      )}

      {hasMore && (
        <button onClick={handleLoadMore} className="mt-4 p-2 bg-blue-500 text-white rounded">
          {loading ? 'Đang tải thêm...' : 'Xem thêm'}
        </button>
      )}
    </div>
  );
};

export default NotificationSection;
