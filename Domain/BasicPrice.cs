using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class BasicPrice
    {
        public Dictionary<Enum, decimal> PriceBySize { get; set; }
    }
}
