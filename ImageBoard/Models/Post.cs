using imageboard.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imageboard.Models
{
    public class Post : IModelsBase
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string UserAgent { get; set; }
        public Thread Thread { get; set; }
        public int ThreadId { get; set; }
        public User User { get; set; }
       
        //public ICollection<Audio> Audio { get; set; }
        //public ICollection<Document> Documents { get; set; }
        //public ICollection<Notice> Notices { get; set; }
        //public ICollection<Picture> Pictures { get; set; }
        //public ICollection<Video> Video { get; set; }

    }
}
