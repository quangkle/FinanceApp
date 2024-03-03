namespace api.Models
{
    public class Portfolio
    {
        public string AppUserId { get; set; } = string.Empty;

        public int StockId { get; set; }

        public Stock? Stock { get; set; }

        public AppUser? AppUser { get; set; }
    }
}