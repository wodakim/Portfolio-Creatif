import { create } from 'zustand';

interface CursorState {
  isHovering: boolean;
  cursorType: 'default' | 'link' | 'text' | 'button' | 'card';
  cursorText: string | null;
  setCursor: (type: CursorState['cursorType'], text?: string | null) => void;
  resetCursor: () => void;
}

interface DevModeState {
  isDevMode: boolean;
  toggleDevMode: () => void;
  setDevMode: (val: boolean) => void;
}

interface ProjectState {
  activeProjectImage: string | null;
  setProjectImage: (url: string | null) => void;
}

interface AppState extends CursorState, DevModeState, ProjectState {}

export const useStore = create<AppState>((set) => ({
  // Cursor
  isHovering: false,
  cursorType: 'default',
  cursorText: null,
  setCursor: (type, text = null) => set({ isHovering: true, cursorType: type, cursorText: text }),
  resetCursor: () => set({ isHovering: false, cursorType: 'default', cursorText: null }),

  // Dev Mode
  isDevMode: false,
  toggleDevMode: () => set((state) => ({ isDevMode: !state.isDevMode })),
  setDevMode: (val) => set({ isDevMode: val }),

  // Project Image Hover
  activeProjectImage: null,
  setProjectImage: (url) => set({ activeProjectImage: url }),
}));
