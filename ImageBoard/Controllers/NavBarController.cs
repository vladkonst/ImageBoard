using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace imageboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NavBarController : Controller
    {
        [HttpGet("getUser")]
        public string GetUser()
        {
            if (User.Identity.IsAuthenticated)
                return User.Identity.Name;
            else return "Anonymous";
        }

        [HttpGet]
        public bool Get()
        {
            return User.Identity.IsAuthenticated;
        }
    }
}
