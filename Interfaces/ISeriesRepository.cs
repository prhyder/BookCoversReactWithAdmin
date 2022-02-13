using BookCoversApi.DTO;
using BookCoversApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.Interfaces
{
    public interface ISeriesRepository
    {
        public Task<Series> GetSeriesBySeriesId(int id);
        public Task<Series> GetSeriesByPremadeId(int id);
        public Task<Series> CreateSeries(SeriesDTO series);
        public Task AddPremadeToSeries(PremadeSeriesDTO premadeSeries);
        public Task ChangeOrderOfPremadeInSeries(PremadeDTO premade, SeriesDTO series, int newOrderPosition);
        public Task DeleteSeries(int id);
        public Task RemovePremadeFromSeries(int id);
        public Task UpdateSeries(int id, SeriesDTO series);
    }
}
