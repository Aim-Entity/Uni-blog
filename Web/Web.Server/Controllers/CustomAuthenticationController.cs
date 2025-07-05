using Application.Interfaces;
using Domain.Entities.UserEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomAuthenticationController : ControllerBase
    {
        private readonly IUserService _userService;

        public CustomAuthenticationController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("Users")]
        public async Task<IEnumerable<User>> Users()
        {
            return await _userService.GetAll();
        }
    }
}
