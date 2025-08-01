﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.BlogEntities;

namespace Application.Interfaces
{
    public interface IBlogService
    {
        public Task<IEnumerable<Blog>> GetAll();
        public Task<Blog> Create(Blog blog);
    }
}
