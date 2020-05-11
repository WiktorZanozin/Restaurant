using Domain.Enums;
using System;

namespace Domain
{
    public class Pizza
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsAvailable { get; set; }
        public decimal PriceForSmall { get; set; }
        public decimal PriceForLarge { get; set; }
        public decimal PriceForXXL { get; set; }
        public PizzaCategories PizzaCategory { get; set; }
    }
}
