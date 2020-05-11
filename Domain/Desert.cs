using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Desert
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int DesertWeight { get; set; }
        public decimal Price { get; set; }
    }
}
