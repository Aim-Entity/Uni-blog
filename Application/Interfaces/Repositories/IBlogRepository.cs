﻿using Domain.Entities.BlogEntities;
using Domain.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface IBlogRepository
    {
        public Task<IEnumerable<Blog>> GetAll();

        public Task<Blog> Create(Blog blog);
    }
}
