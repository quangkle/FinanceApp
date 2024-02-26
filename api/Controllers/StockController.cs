using api.Data;
using api.Dtos.Stock;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public StockController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IList<Stock> stocks = await _dbContext.Stocks.ToListAsync();

            var stocksResponse = stocks.Select(s => s.ToStockResponse());

            return Ok(stocksResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            Stock? stock = await _dbContext.Stocks.FindAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockResponse());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequest createStockRequest)
        {
            Stock newStock = createStockRequest.ToStock();
            await _dbContext.Stocks.AddAsync(newStock);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = newStock.Id }, newStock.ToStockResponse());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CreateStockRequest createStockRequest)
        {
            Stock? updatingStock = await _dbContext.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (updatingStock == null)
            {
                return NotFound();
            }

            updatingStock.Symbol = createStockRequest.Symbol;
            updatingStock.CompanyName = createStockRequest.CompanyName;
            updatingStock.Purchase = createStockRequest.Purchase;
            updatingStock.LastDiv = createStockRequest.LastDiv;
            updatingStock.Industry = createStockRequest.Industry;
            updatingStock.MarketCap = createStockRequest.MarketCap;

            await _dbContext.SaveChangesAsync();

            return Ok(updatingStock.ToStockResponse());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id) 
        {
            Stock? stock = await _dbContext.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (stock == null)
            {
                return NotFound();
            }

            _dbContext.Stocks.Remove(stock);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}