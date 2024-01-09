import { useState } from "react";
import instanceAxios from "../utils/axios";
import { user } from "../types/types";


const useFetchUserData = () => {
    const [userData, setUserData] = useState<user>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async (username : string) =>{
        setError(null);
        if(username === "undefined"){
            setError('Digite o nome do usuário');
            return;
        }
        setLoading(true)
        try {
            username = username.trim().toLowerCase();
            const response = await instanceAxios.get(`users/${username}`);
            if (response.data.error){
                throw(response.data.error)
            }
            setUserData(response.data);
            setLoading(false);
            return response.data;
            

        } catch (errorC) {
            setError("Usuário não encontrado!");
            setLoading(false);
            return 404;
        }
    }
    
    return {loading, error, userData, setUserData, fetchUserData}
}

export default useFetchUserData;