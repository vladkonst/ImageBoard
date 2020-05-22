using imageboard.Models;
using imageboard.Repository;
using Microsoft.AspNetCore.Identity;
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
    public class PostController : Controller
    {
        private readonly Repository<Post> PostContext;
        private readonly Repository<Board> BoardContext;
        private readonly Repository<Thread> ThreadContext;
        UserManager<User> userManager;
        public PostController(UserManager<User> userManager, ApplicationContext _db)
        {
            PostContext = new Repository<Post>(_db);
            BoardContext = new Repository<Board>(_db);
            ThreadContext = new Repository<Thread>(_db);
            this.userManager = userManager;
        }

        [HttpGet]
        public List<Post> Get()
        {
            return PostContext.GetAll().ToList();
        }

        [HttpGet("{id}")]
        public Post[] GetPosts(int id)
        {
            var board = BoardContext.GetAll().ToList().Find(b => b.Id == id);
            var threads = ThreadContext.GetAll().ToList().Where(t => t.BoardId == board.Id);
            var a = PostContext.GetAll().ToList();
            var posts = PostContext.GetAll().ToList().Where(p =>
            ThreadContext.GetAll().ToList().Find(t => t.Id == p.ThreadId).BoardId == board.Id).ToArray();
            return posts;
            //foreach (var b in posts)
            //    yield return $"{{Message:{b.Message},User:{b.User},Thread:{b.ThreadId},Id:{b.Id}}}";
        }

        [HttpPost]
        public void Create(JsonElement val)
        {
            var model = JsonConvert.DeserializeObject<CreatePostModel>(val.ToString());

            if (ModelState.IsValid)
            {
                if (model.UserName != null)
                {
                    var user = userManager.FindByNameAsync(model.UserName).Result;
                    var post = new Post { Message = model.Message, User = user };
                    PostContext.Create(post);
                    PostContext.Save();
                }
                else
                {
                    var thread = ThreadContext.GetById(model.ThreadId);
                    var user = userManager.FindByNameAsync("admin@admin").Result;
                    var post = new Post { Message = model.Message, User = user ,Thread = thread};
                    PostContext.Create(post);
                    PostContext.Save();
                }
            }
        }
    }
}
