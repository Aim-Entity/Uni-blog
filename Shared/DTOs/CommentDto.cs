using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTOs
{
    public class CreateCommentDto
    {
        public long BlogId { get; set; }
        public Guid AuthorId { get; set; }
        public string Message { get; set; }
    }
}
