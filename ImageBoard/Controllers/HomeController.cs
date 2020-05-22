using imageboard.Models;
using imageboard.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imageboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly Repository<Category> CategoryContext;

        public HomeController(ApplicationContext _db)
        {
            CategoryContext = new Repository<Category>(_db);
        }

        [HttpGet]
        public IEnumerable<Category> Get()
        {
            //CategoryContext.Create(new Category {Id = 1,Name = "basic" });
            //CategoryContext.Create(new Category { Id = 2, Name = "Technology and soft" });
            //CategoryContext.Create(new Category { Id = 3, Name = "Games" });
            //CategoryContext.Create(new Category { Id = 4, Name = "Japan culture" });
            //CategoryContext.Save();
            return CategoryContext.GetAll(); 
        }

    }

}