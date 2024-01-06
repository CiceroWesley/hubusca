import { useState } from "react";
import instanceAxios from "../utils/axios";


const useFetchUserData = () => {
    const [userData, setUserData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async (username : string) =>{
        setError(null)
        if(username !
            == ''){
            setError('Digite o nome do usuário');
        }
        setLoading(true)
        try {
            username = username.trim().toLowerCase();
            const response = await instanceAxios.get(`users/${username}`);
            if (response.data.error){
                console.log(response.data.error)
                throw(response.data.error)
            }
            setUserData(response.data);
            setLoading(false);
            

        } catch (errorC) {
            setError(String(errorC));
            setLoading(false);
        }
    }
    
    return {loading, error, userData, setUserData, fetchUserData}
}

export default useFetchUserData;