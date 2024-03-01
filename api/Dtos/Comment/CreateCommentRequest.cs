using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Comment
{
    public class CreateCommentRequest
    {
        [Required]
        [MinLength(5, ErrorMessage = "Tittle must be at least 5 characters")]
        [MaxLength(280, ErrorMessage = "Tittle cannot be over 280 characters")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MinLength(5, ErrorMessage = "Content must be at least 5 characters")]
        [MaxLength(280, ErrorMessage = "Content cannot be over 280 characters")]
        public string Content { get; set; } = string.Empty;

        public int? StockId { get; set; }
    }
}