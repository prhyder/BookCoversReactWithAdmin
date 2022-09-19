using BookCoversApi.Context;
using BookCoversApi.DTO;
using BookCoversApi.Interfaces;
using BookCoversApi.Entities;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.Repository
{
    public class SeriesRepository : ISeriesRepository
    {
        private readonly DapperContext _context;

        public SeriesRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<Series> GetSeriesBySeriesId(int id)
        {
            var query = "SELECT * FROM series WHERE seriesId = @id";
            var queryPremades = "SELECT premadeId, orderInSeries FROM premadeSeries WHERE seriesId = @id";

            using (var connection = _context.CreateConnection())
            {
                var series = await connection.QuerySingleOrDefaultAsync<Series>(query, new { id });
                var premades = await connection.QueryAsync<PremadeSeries>(queryPremades, new { id });

                Series createdSeries = (series == null) ? null : new Series
                {
                    SeriesId = id,
                    SeriesName = series.SeriesName,
                    SeriesPrice = series.SeriesPrice,
                    PremadeSeries = premades.Select(premade => premade).ToList()
                };
                
                return createdSeries;
            }
        }

        public async Task<Series> GetSeriesByPremadeId(int premadeId)
        {
            var query = "SELECT series.seriesId, series.seriesName, series.seriesPrice " +
                "FROM series JOIN premadeSeries ON premadeSeries.seriesId = series.seriesId " +
                "WHERE premadeSeries.premadeId = @premadeId";

            var queryPremades = "SELECT premadeId, orderInSeries FROM premadeSeries WHERE seriesId = @id";

            using (var connection = _context.CreateConnection())
            {
                var series = await connection.QuerySingleOrDefaultAsync<Series>(query, new { premadeId });

                Series createdSeries = null;

                if (series != null)
                {
                    var premades = await connection.QueryAsync<PremadeSeries>(queryPremades, new { id = series.SeriesId });

                    createdSeries = new Series
                    {
                        SeriesId = series.SeriesId,
                        SeriesName = series.SeriesName,
                        SeriesPrice = series.SeriesPrice,
                        PremadeSeries = premades.Select(premade => premade).ToList()
                    };
                }
                return createdSeries;
            }
        }

        public async Task<Series> CreateSeries(SeriesDTO series)
        {
            var query = "INSERT INTO series (seriesName, seriesPrice)" +
                "VALUES (@seriesName, @seriesPrice);" +
                "SELECT LAST_INSERT_ID()";

            var parameters = new DynamicParameters();
            parameters.Add("seriesName", series.SeriesName, DbType.String);
            parameters.Add("seriesPrice", series.SeriesPrice, DbType.Decimal);

            using (var connection = _context.CreateConnection())
            {
                var seriesId = await connection.QuerySingleAsync<int>(query, parameters);

                Series createdSeries = new Series
                {
                    SeriesId = seriesId,
                    SeriesName = series.SeriesName,
                    SeriesPrice = series.SeriesPrice
                };

                return createdSeries;
            }
        }

        public async Task AddPremadeToSeries(PremadeSeriesDTO premadeSeries)
        {
            var query = "INSERT INTO premadeSeries (seriesId, premadeId, orderInSeries) " +
                "VALUES (@seriesId, @premadeId, @orderInSeries)";

            var parameters = new DynamicParameters();
            parameters.Add("seriesId", premadeSeries.SeriesId, DbType.Int32);
            parameters.Add("premadeId", premadeSeries.PremadeId, DbType.Int32);
            parameters.Add("orderInSeries", premadeSeries.OrderInSeries, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public Task ChangeOrderOfPremadeInSeries(PremadeDTO premade, SeriesDTO series, int newOrderPosition)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteSeries(int id)
        {
            var query = "DELETE FROM series WHERE seriesId = @id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { SeriesId = id });
            }
        }

        public async Task RemovePremadeFromSeries(int premadeId)
        {
            var query = "DELETE FROM premadeSeries WHERE premadeId = @premadeId";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { premadeId });
            }
        }

        public async Task UpdateSeries(int id, SeriesDTO series)
        {
            var query = "UPDATE series " +
                "SET seriesName = @seriesName, " +
                "seriesPrice = @seriesPrice " +
                "WHERE seriesId = @seriesId";

            var parameters = new DynamicParameters();
            parameters.Add("seriesId", id, DbType.Int32);
            parameters.Add("seriesName", series.SeriesName, DbType.String);
            parameters.Add("seriesPrice", series.SeriesPrice, DbType.Decimal);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }
    }
}
