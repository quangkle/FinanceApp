import axios from "axios";
import { CommentCreateResponse, CommentGetResponse } from "../Models/Comment";
import { handleApiError } from "../Helpers/ApiErrorHandler";

const api = "http://localhost:5177/api/comment";

export const commentCreateApi = async (title: string, content: string, symbol: string, loginToken: string) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${loginToken}` }
        };

        const data = await axios.post<CommentCreateResponse>(api, {
            title,
            content,
            symbol
        },
        config);

        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export const commentGetApi = async (symbol: string, loginToken: string) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${loginToken}` }
        };

        const data = await axios.get<CommentGetResponse[]>(`${api}?symbol=${symbol}`, config);

        return data;
    } catch (error) {
        handleApiError(error);
    }
}
