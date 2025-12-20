import { useState, useEffect } from "react"
import { getMyProfile, updateMyProfile, type TalentProfile, type ProfileUpdatePayload } from "../api/profile.api"

export const useProfile = () => {
  const [profile, setProfile] = useState<TalentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const data = await getMyProfile()
      setProfile(data)
      setError(null)
    } catch (err: any) {
      console.error("Error fetching profile:", err)
      setError(err.response?.data?.detail || "Gagal mengambil data profil")
    } finally {
      setLoading(false)
    }
  }

  const editProfile = async (payload: ProfileUpdatePayload) => {
    await updateMyProfile(payload)
    await fetchProfile()
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    profile,
    loading,
    error,
    editProfile,
    refetch: fetchProfile
  }
}
