using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.DTO
{
    public class PremadeSeriesDTO
    {
        public int SeriesId { get; set; }
        public int PremadeId { get; set; }
        public int OrderInSeries { get; set; }
    }
}
