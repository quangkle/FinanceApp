using api.Dtos.Comment;
using api.Dtos.Stock;
using api.Models;

namespace api.Mappers
{
    public static class CommentMappers
    {
        public static CommentResponse ToCommentResponse(this Comment comment)
        {
            return new CommentResponse
            {
                Id = comment.Id,
                Content = comment.Content,
                Title = comment.Title,
                CreatedOn = comment.CreatedOn,
                StockId = comment.StockId
            };
        }

        public static Comment ToComment(this CreateCommentRequest createCommentRequest)
        {
            return new Comment
            {
                Content = createCommentRequest.Content,
                Title = createCommentRequest.Title,
                StockId = createCommentRequest.StockId
            };
        }
    }
}