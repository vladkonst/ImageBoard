using imageboard.Models;
using imageboard.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace imageboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        UserManager<User> _userManager;
        ApplicationContext db;
        private readonly Repository<SecretKey> keyContext;

        public UsersController(UserManager<User> userManager, ApplicationContext _db)
        {
            _userManager = userManager;
            keyContext = new Repository<SecretKey>(_db);
            db = _db;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _userManager.Users.ToList();
        }

        [HttpPost]
        public async Task<IActionResult> Create(JsonElement val)
        {
            var model = JsonConvert.DeserializeObject<CreateUserModel>(val.ToString());

            if (ModelState.IsValid)
            {
                User user = new User { Email = model.Email, UserName = model.Email };
                SecretKey key = new SecretKey { Email = model.Email, Key = model.Key };
                var keys = keyContext.GetAll();
                var flag = true;
                foreach (var k in keys)
                {
                    if (k.Key == key.Key)
                        flag = false;
                }
                    if (flag)
                    {
                        var result = await _userManager.CreateAsync(user, model.Password);
                        if (result.Succeeded)
                        {
                            db.Keys.Add(key);
                            await db.SaveChangesAsync();
                            return Ok();
                        }
                        else
                        {
                            foreach (var error in result.Errors)
                            {
                                ModelState.AddModelError(string.Empty, error.Description);
                            }
                        }
                    }
                
            }
            return Ok(100);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            User user = await _userManager.FindByIdAsync(id);
            var key = (from b in db.Keys
                       where b.Email.Equals(user.Email)
                       select b).First();

            if (user != null)
            {
                IdentityResult result = await _userManager.DeleteAsync(user);
                db.Keys.Remove(key);
            }
            return RedirectToAction("Index");
        }
    }
}
