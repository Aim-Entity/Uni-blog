using Domain.Entities.CommentEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.CommentServices.Query.GetAllComments
{
    public record GetAllCommentsQuery() : IRequest<IEnumerable<Comment>>;

}
