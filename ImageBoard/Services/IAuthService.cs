using imageboard.Models;

namespace Blog.API.Services
{
    public interface IAuthService
    {
        AuthData GetAuthData(string id);
    }
}