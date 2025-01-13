// hooks/auth.ts
import { useMutation } from '@tanstack/react-query'
import { LoginUserData, RegisterUserData, UserResponse } from '@/types/auth'
import { loginUser, registerUser } from '@/services/api/auth'

// Hook for user registration
export const useRegisterUser = () =>
  useMutation<UserResponse, unknown, RegisterUserData>({
    mutationFn: registerUser,
  })

// Hook for user login
export const useLoginUser = () =>
  useMutation<UserResponse, unknown, LoginUserData>({
    mutationFn: loginUser,
  })
