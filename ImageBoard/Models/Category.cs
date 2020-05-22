using imageboard.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imageboard.Models
{
    public class Category : IModelsBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Board> Boards { get; set; }
    }
}
