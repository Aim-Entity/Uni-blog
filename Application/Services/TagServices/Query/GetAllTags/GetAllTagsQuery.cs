using Domain.Entities.TagEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.TagServices.Query.GetAllTags
{
    public record GetAllTagsQuery() : IRequest<IEnumerable<Tag>>;

}
