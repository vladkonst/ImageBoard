using imageboard.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using TPrimaryKey = System.Guid;

namespace imageboard.Models
{
    public class Thread : IModelsBase
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int BumpLimit { get; set; }
        public Board Board { get; set; }
        public int BoardId { get; set; }
        public List<Post> Posts { get; set; }
    }   
}
