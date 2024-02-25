using api.Dtos.Stock;
using api.Models;

namespace api.Mappers
{
    public static class StockMappers
    {
        public static StockResponse ToStockResponse(this Stock stock)
        {
            return new StockResponse
            {
                Id = stock.Id,
                Symbol = stock.Symbol,
                CompanyName = stock.CompanyName,
                Purchase = stock.Purchase,
                LastDiv = stock.LastDiv,
                Industry = stock.Industry,
                MarketCap = stock.MarketCap
            };
        }

        public static Stock ToStock(this CreateStockRequest createStockRequest)
        {
            return new Stock
            {
                Symbol = createStockRequest.Symbol,
                CompanyName = createStockRequest.CompanyName,
                Purchase = createStockRequest.Purchase,
                LastDiv = createStockRequest.LastDiv,
                Industry = createStockRequest.Industry,
                MarketCap = createStockRequest.MarketCap
            };
        }
    }
}