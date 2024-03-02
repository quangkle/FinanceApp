using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock
{
    public class StockQueryObject
    {
        public string Symbol { get; set; } = string.Empty;

        public string CompanyName { get; set; } = string.Empty;
    }
}