import axios from "axios";
import { CommentPost } from "../Models/Comment";
import { handleApiError } from "../Helpers/ApiErrorHandler";

const api = "http://localhost:5177/api/comment";

export const commentCreateApi = async (title: string, content: string, symbol: string, loginToken: string) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${loginToken}` }
        };

        const data = await axios.post<CommentPost>(api, {
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