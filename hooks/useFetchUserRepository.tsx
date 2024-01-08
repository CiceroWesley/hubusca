import { useEffect, useState } from "react";
import instanceAxios from "../utils/axios";
import { repository } from "../types/types";


const useFetchUserRepository = (username : string) => {
    const [repositoryData, setRepositoryData] = useState<repository[]>();
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
                setLoading(false);
                return response.data;

            } catch (errorC) {
                setError(String(errorC));
                setLoading(false);
                return errorC;
            }
        }
        getRepositories();
    }, [username])
    
    return {loading, error, repositoryData}
}

export default useFetchUserRepository;