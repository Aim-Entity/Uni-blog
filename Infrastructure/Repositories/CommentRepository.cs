using Application.Interfaces.Repositories;
using Domain.Entities.CommentEntities;
using Infrastructure.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly BlogDbContext _context;

        public CommentRepository(BlogDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> GetAll()
        {
            return _context.Comments.Include(c => c.Author);
        }
        
        public async Task<IEnumerable<Comment>> GetAllWithBlogId(long blogId)
        {
            return _context.Comments.Where(c => c.BlogId == blogId).Include(c => c.Author);
        }

        public async Task<CreateCommentDto> Create(CreateCommentDto comment)
        {
            var author = await _context.Users.FirstOrDefaultAsync(u => u.Id == comment.AuthorId.ToString());
            _context.Comments.Add(new Comment { BlogId = comment.BlogId, Author = author, Message = comment.Message });
            await _context.SaveChangesAsync();
            return comment;
        }
    }
}
