import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { axiosAuth } from '..';

const useAxiosAuth = () => {
    const {data: session} = useSession();

    useEffect(() => {
        const requesIntercept = axiosAuth.interceptors.request.use((config) => {
            if(!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${session?.user.access_token}`
            }
            return config
        })
        return () => {
            axiosAuth.interceptors.request.eject(requesIntercept)
        }
    }, [session])
    return axiosAuth;
};

export default useAxiosAuth;