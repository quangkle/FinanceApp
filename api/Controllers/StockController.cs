using api.Data;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly IStockRepository _stockRepository;

        public StockController(IStockRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IList<Stock> stocks = await _stockRepository.GetAllAsync();

            var stocksResponse = stocks.Select(s => s.ToStockResponse());

            return Ok(stocksResponse);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            Stock? stock = await _stockRepository.GetByIdAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockResponse());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequest createStockRequest)
        {
            Stock stock = createStockRequest.ToStock();
            var newStock = await _stockRepository.CreateAsync(stock);

            return Ok(newStock.ToStockResponse());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CreateStockRequest createStockRequest)
        {
            var updatedStock = await _stockRepository.UpdateAsync(id, createStockRequest.ToStock());

            if (updatedStock == null)
            {
                return NotFound();
            }
            return Ok(updatedStock.ToStockResponse());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id) 
        {
            Stock? stock = await _stockRepository.DeleteAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}