import { useCallback } from "react";
import { useState } from "react"
import { useEffect } from "react"
import { fetchBusinesses } from "../api/businesses";

export const useBusinessData = () => {
  const [businessData, setBusinessData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const loadBusinessData = useCallback(async () => {
    setIsLoading(true)
    setHasError(false)
    try {
      const businesses = await fetchBusinesses();
      setBusinessData(businesses)
      
    } catch (error) {
      console.error(error)
      setHasError(true)
    }
    
    setIsLoading(false)
  }, []);

  useEffect(() => {
    loadBusinessData()
  }, [loadBusinessData])

  return {
    businessData, isLoading, hasError
  }
}