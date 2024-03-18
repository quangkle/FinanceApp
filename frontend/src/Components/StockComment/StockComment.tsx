import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentCreateApi, commentGetApi } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/useAuth";
import { useEffect, useState } from "react";
import { CommentGetResponse } from "../../Models/Comment";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "./StockCommentList/StockCommentList";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const { token } = useAuth();
  const [comments, setComments] = useState<CommentGetResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getComments();
  }, []);

  const handleComment = (e: CommentFormInputs) => {
    commentCreateApi(e.title, e.content, stockSymbol, token ?? "")
      .then((res) => {
        if (res) {
          toast.success("Comment created successfully!");
          getComments();
        } else {
          toast.error("Comment creation failed!");
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  const getComments = () => {
    setLoading(true);
    commentGetApi(stockSymbol, token ?? "").then((res) => {
      setLoading(false);
      setComments(res?.data!);
    });
  };

  return (
    <div className="flex flex-col">
      {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;
