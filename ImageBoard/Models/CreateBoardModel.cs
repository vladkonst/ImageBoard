using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imageboard.Models
{
    public class CreateBoardModel
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }
    }
}
