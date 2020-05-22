using imageboard.Models;
using imageboard.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace imageboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly Repository<SecretKey> keyContext;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager,ApplicationContext _db)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            keyContext = new Repository<SecretKey>(_db);
        }

        [HttpPost]
        public async Task<IActionResult> Register(JsonElement val)
        {
            var formKey = val.GetProperty("key").GetString();
            var Email = val.GetProperty("Email").GetString();
            var pswrd = val.GetProperty("pswrd").GetString();
            var keys = keyContext.GetAll().ToList();
            var flag = false;
            foreach(var key in keys)
            {
                if (key.Key == formKey && key.Email == Email)
                    flag = true;
            }
            if(flag)
                if (Email!=null && pswrd!=null)
                {
                    User user = new User { Email = Email, UserName = Email};
                    var result = await _userManager.CreateAsync(user, pswrd);
                    if (result.Succeeded)
                    {
                        await _signInManager.PasswordSignInAsync(user,pswrd,false, false);
                        return Ok(100);
                    }
                }
            return Ok();
        }
    }
}
