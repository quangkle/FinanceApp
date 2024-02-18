import axios from "axios";
import { CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch } from "../interfaces";

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

export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<CompanyProfile[]>(`https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_FINANCIAL_API_KEY}`)
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("ERROR MESSAGE: ", error.message);
            return null;
        } else {
            console.error("UNEXPECTED ERROR: ", error);
            return null;
        }
    }
}

export const getKeyMetrics = async (query: string) => {
    try {
        const data = await axios.get<CompanyKeyMetrics[]>(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${process.env.REACT_APP_FINANCIAL_API_KEY}`)
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("ERROR MESSAGE: ", error.message);
            return null;
        } else {
            console.error("UNEXPECTED ERROR: ", error);
            return null;
        }
    }
}

export const getIncomeStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyIncomeStatement[]>(`https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_FINANCIAL_API_KEY}`)
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("ERROR MESSAGE: ", error.message);
            return null;
        } else {
            console.error("UNEXPECTED ERROR: ", error);
            return null;
        }
    }
}