using Domain.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.BlogEntities
{
    public class Comment
    {
        public long Id { get; set; }
        public User Author { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
    }
}
