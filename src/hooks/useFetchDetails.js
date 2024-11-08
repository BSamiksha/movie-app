import axios from "axios";
import { useEffect, useState } from "react"

const useFetchDetails = (endpoint) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
          const response = await axios.get(endpoint);
          setData(response.data)
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

    return {data, loading}
}

export default useFetchDetails