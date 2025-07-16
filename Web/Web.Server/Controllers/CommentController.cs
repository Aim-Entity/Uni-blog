using Application.Interfaces;
using Domain.Entities.CommentEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        [Route("Comments")]
        public async Task<IEnumerable<Comment>> Comments()
        {
            return await _commentService.GetAll();
        }

        [HttpPost]
        [Route("Create")]
        public async Task<Comment> Create(Comment comment)
        {
            return await _commentService.Create(comment);
        }

    }
}
