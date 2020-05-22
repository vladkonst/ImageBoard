using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imageboard.Models
{
    public class CreatePostModel
    {
        public string Message { get; set; }
        public string UserName { get; set; }
        public int ThreadId { get; set; }
    }
}
