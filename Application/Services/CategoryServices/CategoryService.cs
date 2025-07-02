using Application.Services.CategoryServices.Query.GetAllCategories;
using Domain.Entities.CategoryEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.CategoryServices
{
    public class CategoryService
    {
        private readonly ISender _sender;

        public CategoryService(ISender sender)
        {
            _sender = sender;
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _sender.Send(new GetAllCategoriesQuery());
        }
    }
}
