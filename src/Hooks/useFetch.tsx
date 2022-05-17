import React from 'react'
import Config from 'react-native-config'

export const useFetch = () => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [data, setData] = React.useState<any>()

    const execute = async (path: string) => {
        const requestURL = Config.baseAPIUrl + path
        console.log(
            'requestedURL',
            requestURL,
            Config.baseAPIUrl,
            Config.dogAPIKey
        )
        // setLoading(true)
        // const response = await fetch(requestURL, {
        //     headers: { 'x-api-key': Config.dogAPIKey },
        // })
        // setLoading(false)
        // setData(response)
    }

    return { execute, loading, data }
}
