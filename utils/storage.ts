export interface LinkData {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
}

export interface ProfileData {
  name: string;
  bio: string;
  avatar: string;
}

export interface AppState {
  links: LinkData[];
  profile: ProfileData;
  theme: string;
}

const STORAGE_KEY = "biohub_state";

export const defaultState: AppState = {
  links: [
    {
      id: "1",
      title: "My Portfolio",
      url: "https://yourportfolio.com",
      icon: "globe",
      clicks: 120,
    },
    {
      id: "2",
      title: "Instagram",
      url: "https://instagram.com/yourhandle",
      icon: "instagram",
      clicks: 450,
    },
    {
      id: "3",
      title: "YouTube Channel",
      url: "https://youtube.com/c/yourchannel",
      icon: "youtube",
      clicks: 890,
    },
  ],
  profile: {
    name: "Alex Creator",
    bio: "Building amazing things with code & design. ✨",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  theme: "glassmorphism",
};

export const saveState = (state: AppState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
};

export const loadState = (): AppState => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved state", e);
        return defaultState;
      }
    }
  }
  return defaultState;
};
