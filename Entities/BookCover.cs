using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.Entities
{
    public class BookCover
    {
        public int BookCoverId { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
        public string ThumbnailUrl { get; set; }
        public string ImageUrl { get; set; }
        public int? PortfolioOrder { get; set; }
        public bool ShowInPortfolio { get; set; }
        public int? GenreId { get; set; }
        public Genre Genre { get; set; }
    }
}
