using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Drinks
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public float Volume { get; set; }
        public decimal Price { get; set; }
    }
}
