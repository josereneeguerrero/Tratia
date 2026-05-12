import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  salon_name: string | null
  phone: string | null
  subscription_plan: string
}

export function useClerkUser() {
  const { user, isLoaded } = useUser()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!isLoaded || !user) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error fetching profile:', error)
          return
        }

        setUserProfile(data)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [isLoaded, user, supabase])

  return {
    user,
    userProfile,
    loading: loading || !isLoaded,
    isAuthenticated: !!user,
  }
}
