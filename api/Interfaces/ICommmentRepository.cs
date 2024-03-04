using api.Dtos.Comment;
using api.Models;

namespace api.Interfaces
{
    public interface ICommmentRepository
    {
        Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject);

        Task<Comment?> GetByIdAsync(int id);

        Task<Comment> CreateAsync(Comment comment);

        Task<Comment?> UpdateAsync(int id, Comment comment);

        Task<Comment?> DeleteAsync(int id);
    }
}