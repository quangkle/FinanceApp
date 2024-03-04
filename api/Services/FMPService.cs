using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Services
{
    public class FMPService : IFMPService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _config = config;
            _httpClient = httpClient;
        }
        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                string fmpServiceKey = _config["FMPKey"] ?? string.Empty;
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={fmpServiceKey}");
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                    var fmpStock = tasks?[0];
                    if (fmpStock == null)
                    {
                        return null;
                    }

                    return fmpStock.ToStock();
                }

                return null;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }
    }
}