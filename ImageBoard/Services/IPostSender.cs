using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imageboard.Services
{
    public interface IPostSender
    {
        string Send();
    }
}
