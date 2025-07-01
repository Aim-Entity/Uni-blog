using Application.Interfaces.Repositories;
using Application.Services.BlogServices.Query.GetAllBlogs;
using Domain.Entities.BlogEntities;
using Domain.Entities.CategoryEntities;
using MediatR;

namespace Application.Services.CategoryServices.Query.GetAllCategories
{
    internal class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, IEnumerable<Category>>
    {
        private readonly ICategoryRepository _categoryRepository;

        public GetAllCategoriesQueryHandler(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<Category>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            var all = await _categoryRepository.GetAll();
            return all;
        }
    }
}