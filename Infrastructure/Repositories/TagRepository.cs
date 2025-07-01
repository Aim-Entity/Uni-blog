using Application.Interfaces.Repositories;
using Domain.Entities.TagEntities;
using Infrastructure.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly BlogDbContext _context;

        public TagRepository(BlogDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tag>> GetAll()
        {
            return _context.Tags;
        }
    }
}
