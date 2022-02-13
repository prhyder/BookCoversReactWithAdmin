using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.Entities
{
    public class PremadeSeries
    {
        public int SeriesId { get; set; }
        public int PremadeId { get; set; }
        public Series Series { get; set; }        
        public Premade Premade { get; set; }
        public int OrderInSeries { get; set; }
    }
}
