using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/portfolio")]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepository;
        private readonly IPortfolioRepository _portfolioRepository;

        public PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepository, IPortfolioRepository portfolioRepository)
        {
            _userManager = userManager;
            _stockRepository = stockRepository;
            _portfolioRepository = portfolioRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolios()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
            {
                return Unauthorized();
            }

            var userPortfolios = await _portfolioRepository.GetUserPortfoliosAsync(appUser);

            return Ok(userPortfolios);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddPortfolio(string symbol)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var stock = await _stockRepository.GetBySymbolAsync(symbol);

            if (appUser == null)
            {
                return Unauthorized();
            }

            if (stock == null)
            {
                return BadRequest("Stock not found");
            }

            var userPortfolios = await _portfolioRepository.GetUserPortfoliosAsync(appUser);

            if (userPortfolios.Any(p => p.Symbol.ToLower() == symbol.ToLower()))
            {
                return BadRequest("Cannot add duplicated stock");
            }

            var portfolio = new Portfolio
            {
                AppUserId = appUser.Id,
                StockId = stock.Id
            };

            portfolio = await _portfolioRepository.CreatePortfolioAsync(portfolio);

            if (portfolio == null)
            {
                return StatusCode(500, "Could not create");
            }

            return Ok("Portfolio created");
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
            {
                return Unauthorized();
            }

            var portfolio = await _portfolioRepository.DeletePortfolio(appUser, symbol);
            if (portfolio == null)
            {
                return BadRequest("Stock not found");
            }

            return Ok("Portfolio removed");
        }
    }
}