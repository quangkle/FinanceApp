using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _dbContext;

        public PortfolioRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Portfolio> CreatePortfolioAsync(Portfolio portfolio)
        {
            var addedPortfolio = await _dbContext.Portfolios.AddAsync(portfolio);
            await _dbContext.SaveChangesAsync();

            return portfolio;
        }

        public async Task<List<Stock>> GetUserPortfoliosAsync(AppUser user)
        {
            return await _dbContext.Portfolios.Where(p => p.AppUserId == user.Id)
                .Select(s => new Stock
                {
                    Id = s.Stock.Id,
                    Symbol = s.Stock.Symbol,
                    CompanyName = s.Stock.CompanyName,
                    Purchase = s.Stock.Purchase,
                    LastDiv = s.Stock.LastDiv,
                    Industry = s.Stock.Industry,
                    MarketCap = s.Stock.MarketCap,
                })
                .ToListAsync();
        }

        public async Task<Portfolio?> DeletePortfolio(AppUser appUser, string symbol)
        {
            var portfolio = await _dbContext.Portfolios.FirstOrDefaultAsync(p => p.AppUserId == appUser.Id && p.Stock.Symbol.ToLower() == symbol.ToLower());

            if (portfolio == null)
            {
                return null;
            }

            _dbContext.Portfolios.Remove(portfolio);
            await _dbContext.SaveChangesAsync();

            return portfolio;
        }
    }
}