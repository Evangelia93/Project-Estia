import { useCallback } from "react";
import { useState } from "react"
import { useEffect } from "react"
import { fetchAddresses } from "../api/businesses";

export const useBusinessAddresses = () => {
  const [businessAddreses, setBusinessAddresses] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const loadAddresses = useCallback(async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const addresses = await fetchAddresses();
      setBusinessAddresses(addresses)
      
    } catch (error) {
      console.error(error)
      setHasError(true)
    }

    setIsLoading(false)
  }, []);

  useEffect(() => {
    loadAddresses()
  }, [loadAddresses])

  return {
    businessAddreses, isLoading, hasError
  }
}