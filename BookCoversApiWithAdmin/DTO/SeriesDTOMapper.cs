using BookCoversApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.DTO
{
    public static class SeriesDTOMapper
    {
        public static SeriesDTO ConvertToDTO(this Series series)
        {
            return new SeriesDTO
            {
                SeriesId = series.SeriesId,
                SeriesName = series.SeriesName,
                SeriesPrice = series.SeriesPrice,
                PremadeSeries = series.PremadeSeries.Select(p => new PremadeSeriesDTO() 
                { 
                    PremadeId = p.PremadeId, 
                    OrderInSeries = p.OrderInSeries
                }).ToList()
            };
        }

        public static IList<SeriesDTO> ConvertToDTO(this IList<Series> series)
        {
            return series.Select(series => series.ConvertToDTO()).ToList();
        }
    }
}
