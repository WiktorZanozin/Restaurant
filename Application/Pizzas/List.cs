using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Pizzas
{
    public class List
    {
        public class Query : IRequest<List<Pizza>> { }

        public class Handler : IRequestHandler<Query, List<Pizza>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Pizza>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pizza = await _context.Pizzas.ToListAsync();
                return pizza;
            }
        }
    }
}
