'use client'
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
};

type NotificationContextType = {
  notifications: any;
  fetchNotifications: (a: boolean) => Promise<void>;
  markAllAsRead: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  page: number;
  limit: number;
  loadedNotifications: any[]; // Lưu trữ thông báo đã tải thêm
  hasMore: boolean
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<any>();
  const [loadedNotifications, setLoadedNotifications] = useState<any[]>([]);
  const info = useAppInfoSelector(state => state.profile.info);
  const [limit, setLimit] = useState<number>(6);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [pages, setPages] = useState<any[]>([]);


  const fetchNotifications = useCallback(async (isAppend: boolean = false) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/notifications?limit=${limit}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${clientAccessToken.value}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch notifications");

      const payload = await res.json();
      setNotifications(payload);
      setLoadedNotifications([...payload.data])
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [limit, page]);

  const fetchABX = useCallback(async () => {
    try {
      if (pages.length > 3) {

      }
    } catch (error) {

    }

  }, [pages.length])


  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    // setNotifications([]);
    // // Optionally, send an API request to mark notifications as read
    // fetch("/api/notifications/mark-as-read", {
    //   method: "POST",
    // }).catch((error) => console.error("Error marking notifications as read:", error));
  }, []);

  useEffect(() => {
    if (Object.entries(info).length > 0) {
      fetchNotifications()
    }
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        fetchNotifications,
        markAllAsRead,
        setPage,
        setLimit,
        page,
        limit,
        loadedNotifications,
        hasMore
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
