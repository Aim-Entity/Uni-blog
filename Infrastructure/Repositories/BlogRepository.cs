using Application.Interfaces.Repositories;
using Domain.Entities.BlogEntities;
using Infrastructure.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly BlogDbContext _context;

        public BlogRepository(BlogDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Blog>> GetAll()
        {
            return _context.Blogs;
        }

        public async Task<Blog> Create(Blog blog)
        {
            await _context.Blogs.AddAsync(blog);
            await  _context.SaveChangesAsync();
            return blog;
        }
    }
}
