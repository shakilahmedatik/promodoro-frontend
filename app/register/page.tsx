'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { imageUpload } from '@/services/api/image-upload'
import { useRegisterUser } from '@/hooks/auth'
import { useUserStore } from '@/stores/user-store'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export default function RegisterPage() {
  const router = useRouter()
  const { user, update } = useUserStore()
  useEffect(() => {
    if (user) {
      return router.push('/pomodoro')
    }
  }, [user])

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const { mutateAsync, isPending } = useRegisterUser()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync({ ...values, image: imageUrl })
      toast.success('Registration Successful!, Login Now.')
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } catch (err) {
      console.log(err)
      toast.error((err as any)?.response?.data?.message)
    }
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      const data = await imageUpload(file)
      setImageUrl(data)
    }
  }

  return (
    <div className='flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-bold tracking-tight'>
            Create a new account
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='flex justify-center'>
              <Avatar className='w-24 h-24'>
                <AvatarImage src={profileImage || ''} />
                <AvatarFallback>Upload</AvatarFallback>
              </Avatar>
            </div>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Create a password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </Form>
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link href='/login' className='underline underline-offset-4'>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
