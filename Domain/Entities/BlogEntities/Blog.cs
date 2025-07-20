using Domain.Entities.CategoryEntities;
using Domain.Entities.CommentEntities;
using Domain.Entities.TagEntities;
using Domain.Entities.UserEntities;
using Domain.Enums.BlogEnums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.BlogEntities
{
    public class Blog
    {
        public long Id { get; set; }
        public Guid Author { get; set; }
        public string AuthorName { get; set; } = "";
        public string Title { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public string? ThumbnailImage { get; set; }
        public string ThumbnailDescription { get; set; }
        public string Description { get; set; }
        public bool IsPrivate { get; set; } = true;
        public bool IsCommentsEnabled { get; set; } = false;
        public List<Comment>? Comments {  get; set; } = new List<Comment>();
    }
}
