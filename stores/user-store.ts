import { user } from '@/types/auth'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserStore {
  user: user | null
  update: (user: user) => void
  clearUser: () => void // Add clearUser to reset the user
}

export const useUserStore = create<UserStore, [['zustand/persist', unknown]]>(
  persist(
    set => ({
      user: null,
      update: (user: user) => set({ user }),
      clearUser: () => set({ user: null }), // Reset the user state
    }),
    {
      name: 'user', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // use sessionStorage instead of localStorage
    }
  )
)
