import { useEffect, useState } from "react";
import instanceAxios from "../utils/axios";


const useFetchUserRepository = (username : string) => {
    const [repositoryData, setRepositoryData] = useState<any[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRepositories = async () => {
            setLoading(true)
            try {
                const response = await instanceAxios.get(`users/${username}/repos`);
                if (response.data.error){
                    throw(response.data.error);
                }
                setRepositoryData(response.data);
                setLoading(false)

            } catch (errorC) {
                setError(String(errorC));
                setLoading(false);
            }
        }
        getRepositories();
    }, [username])
    
    return {loading, error, repositoryData}
}

export default useFetchUserRepository;