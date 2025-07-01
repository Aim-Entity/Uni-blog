using Domain.Entities.CategoryEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.CategoryServices.Query.GetAllCategories
{
    public record GetAllCategoriesQuery() : IRequest<IEnumerable<Category>>;

}
