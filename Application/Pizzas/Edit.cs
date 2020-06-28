using Domain.Enums;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Pizzas
{
    public class Edit
    {
        public class Command : IRequest
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var pizza = await _context.Pizzas.FindAsync(request.Id);

                if (pizza == null)
                    throw new Exception("Could not find this pizza");

                pizza.Name = request.Name ?? pizza.Name;
                pizza.Description = request.Description ?? pizza.Description;
                if(request.IsAvailable!=pizza.IsAvailable)
                    pizza.IsAvailable = request.IsAvailable;
                if (request.PriceForSmall!=0)
                    pizza.PriceForSmall = request.PriceForSmall;
                if (request.PriceForLarge!= 0)
                    pizza.PriceForLarge = request.PriceForLarge;
                if (request.PriceForXXL!=0)
                    pizza.PriceForXXL = request.PriceForXXL;
                if (request.PizzaCategory!=pizza.PizzaCategory)
                    pizza.PizzaCategory = request.PizzaCategory;
                
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
