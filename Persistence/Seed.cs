using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            string[] roleNames = { "Admin", "Customer" };

            foreach (string role in roleNames)
            {
                var roleStore = new RoleStore<IdentityRole>(context);

                if (!context.Roles.Any(r => r.Name == role))
                {
                    await roleStore.CreateAsync(new IdentityRole(role));
                }
            }
            if (!userManager.Users.Any())
            {
                var admin = new AppUser
                {
                    DisplayName = "Admin",
                    UserName = "admin",
                    Email = "admin@gmail.com"
                };
                IdentityResult adminResult = await userManager.CreateAsync(admin, "Pa$$w0rd");

                if (adminResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }

                var customer = new AppUser
                {
                    DisplayName = "Admin",
                    UserName = "admin",
                    Email = "admin@gmail.com"
                };
                IdentityResult customerResult = await userManager.CreateAsync(customer, "Pa$$w0rd");

                if (customerResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(customer, "Customer");
                }

            }

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