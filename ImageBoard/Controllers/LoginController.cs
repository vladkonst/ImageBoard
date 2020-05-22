using Blog.API.Services;
using imageboard.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

namespace imageboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ApplicationContext db;
        IAuthService authService;
        public LoginController(UserManager<User> userManager, SignInManager<User> signInManager, ApplicationContext _db,
            IAuthService authService)
        {
            _userManager = userManager;
            _signInManager = signInManager; 
            db = _db;
            this.authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Login(JsonElement val)
        {
            var email = val.GetProperty("Email").GetString();
            var pswrd = val.GetProperty("pswrd").GetString();
            var rememberMe = val.GetProperty("rememberMe").GetBoolean();
            var userList = _userManager.Users.ToList();
            var isValid = false;
            var id = Guid.NewGuid().ToString();
            var user = new User();

            foreach(var u in userList)
            {
                if (u.Email == email)
                {
                    isValid = true;
                    user = u;
                }
            }
            if (isValid)
            {
                var result = await _signInManager.PasswordSignInAsync(user, pswrd, rememberMe, false);
                return Ok("100");
            }
            return Ok();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}
