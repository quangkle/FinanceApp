using api.Data;
using api.Dtos.Stock;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetAll()
        {
            IList<StockResponse> stockDtos = _dbContext.Stocks.Select(s => s.ToStockResponse()).ToList();

            return Ok(stockDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            Stock? stock = _dbContext.Stocks.Find(id);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockResponse());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateStockRequest createStockRequest)
        {
            Stock newStock = createStockRequest.ToStock();
            _dbContext.Stocks.Add(newStock);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = newStock.Id }, newStock.ToStockResponse());
        }
    }
}