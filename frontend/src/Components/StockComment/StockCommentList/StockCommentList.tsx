import { CommentGetResponse } from '../../../Models/Comment';
import StockCommentListItem from '../StockCommentListItem/StockCommentListItem';

type Props = {
    comments: CommentGetResponse[];
}

const StockCommentList = ({comments}: Props) => {
  return (
    <>
        {comments ? comments.map((comment) => (
            <StockCommentListItem comment={comment} />
        )) : ""}
    </>
  )
}

export default StockCommentList