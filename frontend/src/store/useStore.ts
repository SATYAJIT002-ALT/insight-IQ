import { create } from "zustand";
import { User, AlertItem } from "@/types";

interface AppState {
  user: User | null;
  token: string | null;
  regionFilter: string;
  categoryFilter: string;
  searchQuery: string;
  alerts: AlertItem[];
  unreadAlertCount: number;
  uploadedDatasetResult: any | null;
  activeFileName: string | null;
  setUser: (user: User | null, token?: string | null) => void;
  logout: () => void;
  setRegionFilter: (region: string) => void;
  setCategoryFilter: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setAlerts: (alerts: AlertItem[]) => void;
  acknowledgeAlert: (id: string) => void;
  setUploadedDatasetResult: (result: any | null, fileName?: string | null) => void;
  clearUploadedDataset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: {
    id: "usr-admin-1",
    name: "Sarah Connor",
    email: "admin@insightiq.ai",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
  },
  token: "demo-jwt-token-insightiq",
  regionFilter: "ALL",
  categoryFilter: "ALL",
  searchQuery: "",
  alerts: [
    {
      id: "alt-1",
      title: "Revenue Surge Detected",
      message: "North America Enterprise sales exceeded quarterly forecast by 28%",
      severity: "LOW",
      status: "ACTIVE",
      metric: "Revenue",
      threshold: 4000000,
      current: 4820000,
      created_at: new Date().toISOString()
    },
    {
      id: "alt-2",
      title: "Inventory Shortage Risk",
      message: "InsightIQ Neural Core stock below safety buffer in EU-Central warehouse",
      severity: "HIGH",
      status: "ACTIVE",
      metric: "Inventory",
      threshold: 50,
      current: 18,
      created_at: new Date().toISOString()
    }
  ],
  unreadAlertCount: 2,
  uploadedDatasetResult: null,
  activeFileName: null,
  setUser: (user, token = null) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
  setRegionFilter: (regionFilter) => set({ regionFilter }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setAlerts: (alerts) => set({ alerts, unreadAlertCount: alerts.filter(a => a.status === 'ACTIVE').length }),
  acknowledgeAlert: (id) => set((state) => {
    const updated = state.alerts.map(a => a.id === id ? { ...a, status: "ACKNOWLEDGED" as const } : a);
    return {
      alerts: updated,
      unreadAlertCount: updated.filter(a => a.status === 'ACTIVE').length
    };
  }),
  setUploadedDatasetResult: (result, fileName = null) => set({
    uploadedDatasetResult: result,
    activeFileName: fileName || (result ? result.filename : null)
  }),
  clearUploadedDataset: () => set({
    uploadedDatasetResult: null,
    activeFileName: null
  })
}));
