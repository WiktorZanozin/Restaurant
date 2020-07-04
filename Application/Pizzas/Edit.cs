using Application.Errors;
using Domain.Enums;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Net;
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
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.PriceForSmall).NotNull().NotEmpty();
                RuleFor(x => x.PriceForLarge).NotNull().NotEmpty();
                RuleFor(x => x.PriceForXXL).NotNull().NotEmpty();
                RuleFor(x => x.PizzaCategory).IsInEnum();
            }
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
                    throw new RestException(HttpStatusCode.NotFound, new
                    {
                        pizza = "Not found"
                    });

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
