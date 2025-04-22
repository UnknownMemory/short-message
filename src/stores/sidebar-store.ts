import { create } from "zustand";


interface SidebarState {
    isOpen: boolean,
    setIsOpen: (status: boolean) => void,
    notificationBadge: number | null,
    setNotificationBadge: (notifications: number) => void,
}


export const useSidebarStore = create<SidebarState>((set) => ({
    isOpen: false,
    setIsOpen: (status) => set(() => ({ isOpen: status })),
    notificationBadge: null,
    setNotificationBadge: (notifications) => set(() => ({ notificationBadge: notifications }))
}))
