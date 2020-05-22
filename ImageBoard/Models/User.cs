using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace imageboard.Models
{
    public class User : IdentityUser
    {
        public int Year { get; set; }

        public List<Post> Posts { get; set; }
        public List<News> News { get; set; }
    }

}
