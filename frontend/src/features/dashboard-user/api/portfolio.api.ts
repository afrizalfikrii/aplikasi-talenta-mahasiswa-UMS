import http from "@/lib/http"

export interface Portfolio {
  id: number
  project_title: string
  description: string
  project_url: string
  image: string | null
  created_at: string
}

export interface PortfolioPayload {
  project_title: string
  description: string
  project_url: string
  image?: File | null
}

export const getMyPortfolios = async (): Promise<Portfolio[]> => {
  const res = await http.get('/talents/me/portfolios/')
  return res.data
}

export const createPortfolio = async (payload: PortfolioPayload): Promise<Portfolio> => {
  const formData = new FormData()
  formData.append('project_title', payload.project_title)
  formData.append('description', payload.description)
  formData.append('project_url', payload.project_url)
  if (payload.image) {
    formData.append('image', payload.image)
  }
  
  const res = await http.post('/talents/me/portfolios/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return res.data
}

export const updatePortfolio = async (id: number, payload: PortfolioPayload): Promise<Portfolio> => {
  const formData = new FormData()
  formData.append('project_title', payload.project_title)
  formData.append('description', payload.description)
  formData.append('project_url', payload.project_url)
  if (payload.image) {
    formData.append('image', payload.image)
  }
  
  const res = await http.put(`/talents/me/portfolios/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return res.data
}

export const deletePortfolio = async (id: number): Promise<void> => {
  await http.delete(`/talents/me/portfolios/${id}/`)
}
