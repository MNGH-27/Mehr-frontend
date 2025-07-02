import { type AxiosRequestConfig } from 'axios'

import { axiosInterceptor } from '@core/services/axios'
import { type TCriticalAny } from '@core/types/type-any'

const axiosRequestHandler = (config: AxiosRequestConfig<TCriticalAny>) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInterceptor(config)

            //check if there is error in response data
            if (response.data.errors) {
                //check if this response is valid
                if (response.data.errors.isValid) {
                    //this response is valid an return as successful
                    resolve({ code: 'success', data: response.data, status: response.status })
                }

                //there is error in response
                reject({ code: 'error', data: response.data, status: 400 })
            }

            if (response.data.isValid === false) reject({ code: 'error', data: response.data, status: 400 })

            //there is no error field in response data =>  data as successful response
            resolve({ code: 'success', data: response.data, status: response.status })
        } catch (err: TCriticalAny) {
            reject({
                code: 'error',
                data: err.response ? err.response.data : err,
                status: err.response ? err.response.status : 500
            })
        }
    })
export default axiosRequestHandler
