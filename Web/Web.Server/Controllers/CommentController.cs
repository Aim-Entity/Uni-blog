using Application.Interfaces;
using Domain.Entities.CommentEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.DTOs;

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

        [HttpGet]
        [Route("AllCommentWthBlogId")]
        public async Task<IEnumerable<Comment>> AllCommentWthBlogId(long blogId)
        {
            return await _commentService.AllCommentWthBlogId(blogId);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<CreateCommentDto> Create(CreateCommentDto comment)
        {
            return await _commentService.Create(comment);
        }

    }
}
