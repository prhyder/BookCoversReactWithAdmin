using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.Entities
{
    public class Series
    {
        public int SeriesId { get; set; }
        public string SeriesName { get; set; }
        public decimal SeriesPrice { get; set; }
        public List<PremadeSeries> PremadeSeries { get; set; }
    }
}
