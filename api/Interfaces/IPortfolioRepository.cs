using api.Models;

namespace api.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<List<Stock>> GetUserPortfoliosAsync(AppUser user);

        Task<Portfolio> CreatePortfolioAsync(Portfolio portfolio);

        Task<Portfolio> DeletePortfolio(AppUser appUser, string symbol);
    }
}