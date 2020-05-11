using System;
using System.Collections.Generic;
using System.Linq;
using Domain;
using Domain.Enums;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Pizzas.Any())
            {
                var pizzas = new List<Pizza>
                {
                    new Pizza
                    {
                        Name = "Peperoni",
                        Description = "Salami, cheese, red onion",
                        IsAvailable = true,
                        PriceForSmall = 8.2M,
                        PriceForLarge = 12.9M,
                        PriceForXXL = 14.3M,
                        PizzaCategory = PizzaCategories.Classic
                    },
                    new Pizza
                    {
                        Name = "Don Barbeque",
                        Description = "Chicken, mozarella, red onion, bacon, barbeque sauce",
                        IsAvailable = true,
                        PriceForSmall = 10M,
                        PriceForLarge = 14.9M,
                        PriceForXXL = 16.4M,
                        PizzaCategory = PizzaCategories.Premium
                    },
                    new Pizza
                    {
                        Name = "Kentucky",
                        Description = "Chicken, corn, peper",
                        IsAvailable = true,
                        PriceForSmall = 9M,
                        PriceForLarge = 12.6M,
                        PriceForXXL = 14.4M,
                        PizzaCategory = PizzaCategories.Ours
                    }
                };

                context.Pizzas.AddRange(pizzas);
                context.SaveChanges();
            }
        }
    }
}