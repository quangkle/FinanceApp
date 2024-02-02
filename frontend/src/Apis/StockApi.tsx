import axios from "axios";
import { CompanySearch } from "../interfaces";

interface SearchResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
    try {
        const data = await axios.get<SearchResponse>(`https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_FINANCIAL_API_KEY}`)
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("ERROR MESSAGE: ", error.message);
            return error.message;
        } else {
            console.error("UNEXPECTED ERROR: ", error);
            return "AN UNEXPECTED ERROR HAS OCCURRED."
        }
    }
}