using Application.Interfaces;
using Domain.Entities.BlogEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        [Route("Blogs")]
        public async Task<IEnumerable<Blog>> Blogs()
        {
            return await _blogService.GetAll();
        }

        [HttpPost]
        [Route("Create")]
        public async Task<Blog> Create(Blog Blog)
        {
            return await _blogService.Create(Blog);
        }
    }
}
