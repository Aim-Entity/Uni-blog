using Application.Interfaces;
using Domain.Entities.CategoryEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [Route("Categories")]
        public async Task<IEnumerable<Category>> Categories()
        {
            return await _categoryService.GetAll();
        }
    }
}
