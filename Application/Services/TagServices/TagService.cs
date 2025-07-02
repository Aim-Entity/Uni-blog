using Application.Services.TagServices.Query.GetAllTags;
using Domain.Entities.TagEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.TagServices
{
    public class TagService
    {
        private readonly ISender _sender;

        public TagService(ISender sender)
        {
            _sender = sender;
        }

        public async Task<IEnumerable<Tag>> GetAll()
        {
            return await _sender.Send(new GetAllTagsQuery());
        }
    }
}
