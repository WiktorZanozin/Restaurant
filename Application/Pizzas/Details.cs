using Domain;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Pizzas
{
    public class Details
    {
        public class Query : IRequest<Pizza>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Pizza>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Pizza> Handle(Query request, CancellationToken cancellationToken)
            {
                var pizza = await _context.Pizzas.FindAsync(request.Id);
                return pizza;
            }
        }
    }
}
