using Domain;
using Domain.Enums;
using FluentValidation;
using MediatR;
using Persistence;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Pizzas
{
     public class Create
    {
        public class Command: IRequest 
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
                var pizza = new Pizza
                {
                    Id = request.Id,
                    Name = request.Name,
                    Description = request.Description,
                    IsAvailable = request.IsAvailable,
                    PriceForSmall = request.PriceForSmall,
                    PriceForLarge = request.PriceForLarge,
                    PriceForXXL = request.PriceForXXL,
                    PizzaCategory = request.PizzaCategory
                };

                _context.Pizzas.Add(pizza);
                var success=await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
