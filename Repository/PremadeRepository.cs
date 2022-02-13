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
    public class PremadeRepository : IPremadeRepository
    {
        private readonly DapperContext _context;

        public PremadeRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<IList<Premade>> GetPremades()
        {
            var query = "SELECT * FROM dbo.Premade p LEFT JOIN dbo.BookCover b ON p.BookCoverId = b.BookCoverId";

            using (var connection = _context.CreateConnection())
            {
                var premadeDict = new Dictionary<int, Premade>();

                var premades = await connection.QueryAsync<Premade, BookCover, Premade>(
                    query, (premade, bookCover) =>
                    {
                        if (!premadeDict.TryGetValue(premade.PremadeId, out var currentPremade))
                        {
                            currentPremade = premade;
                            premadeDict.Add(currentPremade.PremadeId, currentPremade);
                        }

                        currentPremade.BookCover = bookCover;
                        return currentPremade;
                    }, splitOn: "BookCoverId");
                return premades.Distinct().ToList();
            }
        }

        public async Task<Premade> GetById(int id)
        {
            var query = "SELECT * FROM dbo.Premade WHERE PremadeId = @id";

            using (var connection = _context.CreateConnection())
            {
                var premade = await connection.QuerySingleOrDefaultAsync<Premade>(query, new { id });
                return premade;
            }
        }

        public async Task<Premade> Add(PremadeDTO premadeDto)
        {
            using (var connection = _context.CreateConnection())
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    var queryBookCover = "INSERT INTO dbo.BookCover " +
                    "(Title, AuthorName, ThumbnailUrl, ImageUrl, PortfolioOrder, ShowInPortfolio, GenreId) " +
                    "VALUES (@Title, @AuthorName, @ThumbnailUrl, @ImageUrl, @PortfolioOrder, @ShowInPortfolio, @GenreId);" +
                    "SELECT CAST(SCOPE_IDENTITY() as int)";

                    var parametersBC = new DynamicParameters();
                    parametersBC.Add("Title", premadeDto.BookCover.Title, DbType.String);
                    parametersBC.Add("AuthorName", premadeDto.BookCover.AuthorName, DbType.String);
                    parametersBC.Add("ThumbnailUrl", premadeDto.BookCover.ThumbnailUrl, DbType.String);
                    parametersBC.Add("ImageUrl", premadeDto.BookCover.ImageUrl, DbType.String);
                    parametersBC.Add("PortfolioOrder", premadeDto.BookCover.PortfolioOrder, DbType.Int32);
                    parametersBC.Add("ShowInPortfolio", premadeDto.BookCover.ShowInPortfolio, DbType.Boolean);
                    parametersBC.Add("GenreId", premadeDto.BookCover.GenreId, DbType.Int32);

                    var result = await connection.QueryAsync<int>(queryBookCover, parametersBC, transaction: transaction);
                    int bookCoverId = result.Single();

                    var queryPremade = "INSERT INTO dbo.Premade " +
                    "(BookCoverId, Code, Price, Sold, DisplayInStore, PremadeOrder, DateAdded, PurchaseDate, SeriesId)" +
                    "VALUES (@BookCoverId, @Code, @Price, @Sold, @DisplayInStore, @PremadeOrder, GETDATE(), @PurchaseDate, @SeriesId);" +
                    "SELECT CAST(SCOPE_IDENTITY() as int)";

                    var parametersP = new DynamicParameters();
                    parametersP.Add("BookCoverId", bookCoverId, DbType.Int32);
                    parametersP.Add("Code", premadeDto.Code, DbType.String);
                    parametersP.Add("Price", premadeDto.Price, DbType.Decimal);
                    parametersP.Add("Sold", premadeDto.Sold, DbType.Boolean);
                    parametersP.Add("DisplayInStore", premadeDto.DisplayInStore, DbType.Boolean);
                    parametersP.Add("PremadeOrder", premadeDto.PremadeOrder, DbType.Int32);
                    parametersP.Add("DateAdded", premadeDto.DateAdded, DbType.DateTime2);
                    parametersP.Add("PurchaseDate", premadeDto.PurchaseDate, DbType.DateTime2);
                    parametersP.Add("SeriesId", premadeDto.SeriesId, DbType.Int32);

                    var premadeId = await connection.QuerySingleAsync<int>(queryPremade, parametersP, transaction: transaction);

                    transaction.Commit();

                    var createdPremade = new Premade
                    {
                        PremadeId = premadeId,
                        BookCoverId = bookCoverId,
                        Code = premadeDto.Code,
                        Price = premadeDto.Price,
                        Sold = premadeDto.Sold,
                        DisplayInStore = premadeDto.DisplayInStore,
                        PremadeOrder = premadeDto.PremadeOrder,
                        DateAdded = premadeDto.DateAdded,
                        PurchaseDate = premadeDto.PurchaseDate,
                        SeriesId = premadeDto.SeriesId
                    };

                    return createdPremade;
                } 
            }
        }   

        public async Task Update(int id, PremadeDTO premadeDto)
        {
            using (var connection = _context.CreateConnection())
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    var queryPremade = "UPDATE dbo.Premade " +
                    "SET BookCoverId = @BookCoverId," +
                    "Code = @Code," +
                    "Price = @Price," +
                    "Sold = @Sold," +
                    "DisplayInStore = @DisplayInStore," +
                    "PremadeOrder = @PremadeOrder," +
                    "DateAdded = @DateAdded," +
                    "PurchaseDate = @PurchaseDate," +
                    "SeriesId = @SeriesId " +
                    "WHERE PremadeId = @PremadeId";

                    var parametersP = new DynamicParameters();
                    parametersP.Add("PremadeId", id, DbType.Int32);
                    parametersP.Add("BookCoverId", premadeDto.BookCoverId, DbType.Int32);
                    parametersP.Add("Code", premadeDto.Code, DbType.String);
                    parametersP.Add("Price", premadeDto.Price, DbType.Decimal);
                    parametersP.Add("Sold", premadeDto.Sold, DbType.Boolean);
                    parametersP.Add("DisplayInStore", premadeDto.DisplayInStore, DbType.Boolean);
                    parametersP.Add("PremadeOrder", premadeDto.PremadeOrder, DbType.Int32);
                    parametersP.Add("DateAdded", premadeDto.DateAdded, DbType.DateTime2);
                    parametersP.Add("PurchaseDate", premadeDto.PurchaseDate, DbType.DateTime2);
                    parametersP.Add("SeriesId", premadeDto.SeriesId, DbType.Int32);

                    await connection.QueryAsync(queryPremade, parametersP, transaction: transaction);

                    var queryBookCover = "UPDATE dbo.BookCover " +
                    "SET Title = @Title, " +
                    "AuthorName = @AuthorName," +
                    "ThumbnailUrl = @ThumbnailUrl, " +
                    "ImageUrl = @ImageUrl, " +
                    "PortfolioOrder = @PortfolioOrder," +
                    "ShowInPortfolio = @ShowInPortfolio, " +
                    "GenreId = @GenreId " +
                    "WHERE BookCoverId = @BookCoverId";

                    var parametersBC = new DynamicParameters();
                    parametersBC.Add("BookCoverId", premadeDto.BookCoverId, DbType.Int32);
                    parametersBC.Add("Title", premadeDto.BookCover.Title, DbType.String);
                    parametersBC.Add("AuthorName", premadeDto.BookCover.AuthorName, DbType.String);
                    parametersBC.Add("ThumbnailUrl", premadeDto.BookCover.ThumbnailUrl, DbType.String);
                    parametersBC.Add("ImageUrl", premadeDto.BookCover.ImageUrl, DbType.String);
                    parametersBC.Add("PortfolioOrder", premadeDto.BookCover.PortfolioOrder, DbType.Int32);
                    parametersBC.Add("ShowInPortfolio", premadeDto.BookCover.ShowInPortfolio, DbType.String);
                    parametersBC.Add("GenreId", premadeDto.BookCover.GenreId, DbType.Int32);

                    await connection.QueryAsync(queryBookCover, parametersBC, transaction: transaction);

                    transaction.Commit();
                }
            }
        }

        public async Task Delete(int id)
        {
            var query = "DELETE FROM dbo.Premade WHERE PremadeId = @id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }

        public Task UpdateOrder(int premadeId, int order, IList<PremadeDTO> premades)
        {
            throw new NotImplementedException();
        }
    }
}
