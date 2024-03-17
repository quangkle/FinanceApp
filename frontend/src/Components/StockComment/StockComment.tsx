import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentCreateApi } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/useAuth";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const { token } = useAuth();

  const handleComment = (e: CommentFormInputs) => {
    commentCreateApi(e.title, e.content, stockSymbol, token ?? "")
      .then((res) => {
        if (res) {
          toast.success("Comment created successfully!");
        } else {
          toast.error("Comment creation failed!");
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  return (
    <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
  );
};

export default StockComment;
