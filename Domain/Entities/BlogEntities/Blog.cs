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
        public User Author { get; set; }
        public string Title { get; set; }
        public Category Category { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public string ThumbnailImage { get; set; }
        public string Description { get; set; }
        public BlogStatusEnum Status { get; set; }
        public List<Tag> Tags {  get; set; } 
        public List<Comment> Comments {  get; set; } 

    }
}
