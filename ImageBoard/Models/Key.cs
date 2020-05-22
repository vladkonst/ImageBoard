using imageboard.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imageboard.Models
{
    public class SecretKey : IModelsBase
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Email { get; set; }
    }
}
