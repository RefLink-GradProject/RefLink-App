import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { GetUserInfo } from "./api";

const Callback = () => {
  const { getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const token = await getIdTokenClaims();
        const rawtoken = token!.__raw;
        const response = await GetUserInfo(rawtoken);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <div></div>;
};

export default Callback;
