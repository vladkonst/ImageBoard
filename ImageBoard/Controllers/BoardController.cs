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
    public class BoardController : Controller
    {

        private readonly Repository<Board> BoardContext;
        private readonly Repository<Category> CategoryContext;

        public BoardController(ApplicationContext _db)
        {
            CategoryContext = new Repository<Category>(_db);
            BoardContext = new Repository<Board>(_db);
        }

        [HttpGet("{name}")]
        public string GetBoardByName(string name)
        {
            var board = BoardContext.GetAll().ToList().Find(b => b.ShortName == name);
            return System.Text.Json.JsonSerializer.Serialize(board);
        }

        [HttpGet]
        public List<Board> Get()
        {
            return BoardContext.GetAll().ToList();
        }

        [HttpPost]
        public void Create(JsonElement val)
        {
            var model = JsonConvert.DeserializeObject<CreateBoardModel>(val.ToString());
            var boards = BoardContext.GetAll().ToList();
            var flag = false;

            foreach (var item in boards)
            {
                if (item.Name == model.Name)
                    flag = true;
            }

            if (ModelState.IsValid && !flag)
            {
                var category = CategoryContext.GetAll().Where(t => t.Name == model.Category).FirstOrDefault();
                var board = new Board { Name = model.Name, Category = category, Description = model.Description, ShortName = model.ShortName };

                BoardContext.Create(board);
                BoardContext.Save();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await BoardContext.Delete(int.Parse(id));
            return Ok();
        }
    }
}
