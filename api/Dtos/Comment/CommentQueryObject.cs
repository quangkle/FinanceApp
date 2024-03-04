namespace api.Dtos.Comment
{
    public class CommentQueryObject
    {
        public string Symbol { get; set; } = string.Empty;

        public bool IsDescending { get; set; } = true;        
    }
}