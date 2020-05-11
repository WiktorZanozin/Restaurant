using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class ExtrasPrice
    {
        Dictionary<Extras, decimal> extrasPrices = new Dictionary<Extras, decimal>(5)
        {
            [Extras.None] = 0,
            [Extras.Beacon]=0.7M,
            [Extras.DoubleCheese]=1,
            [Extras.Mozarella]=0.7M,
            [Extras.Mushrooms]=0.5M
        };
    }
}
