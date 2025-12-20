import { useState, useEffect } from "react"
import { getMyPortfolios, createPortfolio, updatePortfolio, deletePortfolio, type Portfolio, type PortfolioPayload } from "../api/portfolio.api"

export const usePortfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPortfolios = async () => {
    try {
      setLoading(true)
      const data = await getMyPortfolios()
      setPortfolios(data)
      setError(null)
    } catch (err: any) {
      console.error("Error fetching portfolios:", err)
      setError(err.response?.data?.detail || "Gagal mengambil data portfolio")
    } finally {
      setLoading(false)
    }
  }

  const addPortfolio = async (payload: PortfolioPayload) => {
    await createPortfolio(payload)
    await fetchPortfolios()
  }

  const editPortfolio = async (id: number, payload: PortfolioPayload) => {
    await updatePortfolio(id, payload)
    await fetchPortfolios()
  }

  const removePortfolio = async (id: number) => {
    await deletePortfolio(id)
    await fetchPortfolios()
  }

  useEffect(() => {
    fetchPortfolios()
  }, [])

  return {
    portfolios,
    loading,
    error,
    addPortfolio,
    editPortfolio,
    removePortfolio,
    refetch: fetchPortfolios
  }
}
