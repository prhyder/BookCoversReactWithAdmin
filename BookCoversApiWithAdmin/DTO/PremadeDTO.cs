using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.DTO
{
    public class PremadeDTO
    {
        public int PremadeId { get; set; }
        public int BookCoverId { get; set; }
        public string Code { get; set; }
        public decimal Price { get; set; }
        public bool Sold { get; set; }
        public bool DisplayInStore { get; set; }
        public int? PremadeOrder { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public int? SeriesId { get; set; }
        public BookCoverDTO BookCover { get; set; }
    }
}
