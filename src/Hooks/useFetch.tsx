import React from 'react'
import { Config } from '../Utilities/Config'

export const useFetch = () => {
  const execute = async (path: string) => {
    const requestURL = Config.apiURL + path

    try {
      const response = await fetch(requestURL, {
        headers: { 'x-api-key': Config.apiKey },
      })

      const parsedResponse = await response.json()

      return parsedResponse
    } catch (e) {
      console.error(e)
    }
  }

  return { execute }
}
