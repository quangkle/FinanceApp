import axios from "axios";
import { PortfolioCreateResponse, PortfolioDeleteResponse, PortfolioGetResponse } from "../Models/Portfolio";
import { handleApiError } from "../Helpers/ApiErrorHandler";

const api = "http://localhost:5177/api/portfolio";

export const portfolioAddApi = async (symbol: string, loginToken: string) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${loginToken}` }
        };

        return await axios.post<PortfolioCreateResponse>(api + `?symbol=${symbol}`, config);
    } catch (error) {
        handleApiError(error);
    }
}

export const portfolioDeleteApi = async (symbol: string, loginToken: string) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${loginToken}` }
        };

        return await axios.delete<PortfolioDeleteResponse>(api + `?symbol=${symbol}`, config);
    } catch (error) {
        handleApiError(error);
    }
}

export const portfolioGetApi = async (loginToken: string) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${loginToken}` }
        };

        return await axios.get<PortfolioGetResponse[]>(api, config);
    } catch (error) {
        handleApiError(error);
    }
}