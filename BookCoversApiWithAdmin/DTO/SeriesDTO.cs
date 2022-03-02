using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.DTO
{
    public class SeriesDTO
    {
        public int SeriesId { get; set; }
        public string SeriesName { get; set; }
        public decimal SeriesPrice { get; set; }
        public List<PremadeSeriesDTO> PremadeSeries { get; set; }
    }
}
