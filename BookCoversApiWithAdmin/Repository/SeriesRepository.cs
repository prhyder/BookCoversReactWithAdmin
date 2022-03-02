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
            var query = "SELECT * FROM dbo.Series WHERE SeriesId = @id";
            var queryPremades = "SELECT PremadeId, OrderInSeries FROM dbo.PremadeSeries WHERE SeriesId = @id";

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
            var query = "SELECT Series.SeriesId, Series.SeriesName, Series.SeriesPrice " +
                "FROM Series JOIN PremadeSeries ON PremadeSeries.SeriesId = Series.SeriesId " +
                "WHERE PremadeSeries.PremadeId = @premadeId";

            var queryPremades = "SELECT PremadeId, OrderInSeries FROM dbo.PremadeSeries WHERE SeriesId = @id";

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
            var query = "INSERT INTO dbo.Series (SeriesName, SeriesPrice)" +
                "VALUES (@SeriesName, @SeriesPrice);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("SeriesName", series.SeriesName, DbType.String);
            parameters.Add("SeriesPrice", series.SeriesPrice, DbType.Decimal);

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
            var query = "INSERT INTO dbo.PremadeSeries (SeriesId, PremadeId, OrderInSeries) " +
                "VALUES (@SeriesId, @PremadeId, @OrderInSeries)";

            var parameters = new DynamicParameters();
            parameters.Add("SeriesId", premadeSeries.SeriesId, DbType.Int32);
            parameters.Add("PremadeId", premadeSeries.PremadeId, DbType.Int32);
            parameters.Add("OrderInSeries", premadeSeries.OrderInSeries, DbType.Int32);

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
            var query = "DELETE FROM dbo.Series WHERE SeriesId = @id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { SeriesId = id });
            }
        }

        public async Task RemovePremadeFromSeries(int premadeId)
        {
            var query = "DELETE FROM dbo.PremadeSeries WHERE PremadeId = @premadeId";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { premadeId });
            }
        }

        public async Task UpdateSeries(int id, SeriesDTO series)
        {
            var query = "UPDATE dbo.Series " +
                "SET SeriesName = @SeriesName, " +
                "SeriesPrice = @SeriesPrice " +
                "WHERE SeriesId = @SeriesId";

            var parameters = new DynamicParameters();
            parameters.Add("SeriesId", id, DbType.Int32);
            parameters.Add("SeriesName", series.SeriesName, DbType.String);
            parameters.Add("SeriesPrice", series.SeriesPrice, DbType.Decimal);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }
    }
}
