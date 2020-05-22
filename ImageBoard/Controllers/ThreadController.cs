using imageboard.Models;
using imageboard.Repository;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace imageboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThreadController : Controller
    {

        private readonly Repository<Board> BoardContext;
        private readonly Repository<Category> CategoryContext;
        private readonly Repository<Thread> ThreadContext;

        public ThreadController(ApplicationContext _db)
        {
            ThreadContext = new Repository<Thread>(_db);
            BoardContext = new Repository<Board>(_db);
        }

        [HttpGet]
        public List<Thread> Get()
        {
            return ThreadContext.GetAll().ToList();
        }

        [HttpPost]
        public void Create(JsonElement val)
        {
            var model = JsonConvert.DeserializeObject<CreateThreadModel>(val.ToString());
                var threads = BoardContext.GetAll().ToList();
            var flag = false;
            if (model.BoardName != null)
            {
                foreach (var item in threads)
                {
                    if (item.Name == model.Name)
                        flag = true;
                }

                if (ModelState.IsValid && !flag)
                {
                    var board = BoardContext.GetAll().Where(t => t.Name == model.BoardName).FirstOrDefault();
                    var thread = new Thread { Title = model.Name, Board = board };

                    ThreadContext.Create(thread);
                    ThreadContext.Save();
                }
            }
        }
    }
}
