using Application.Interfaces;
using Domain.Entities.TagEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;

        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        [Route("Tags")]
        public async Task<IEnumerable<Tag>> Tags()
        {
            return await _tagService.GetAll();
        }
    }
}
