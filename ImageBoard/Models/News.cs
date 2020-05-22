using imageboard.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imageboard.Models
{
    public class News : IModelsBase
    {
        public int Id { get; set; }
        public User User { get; set; }
    }
}
