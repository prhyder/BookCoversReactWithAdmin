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
            var query = "SELECT * FROM premade p LEFT JOIN bookCover b ON p.bookCoverId = b.bookCoverId";

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
            var query = "SELECT * FROM premade WHERE premadeId = @id";

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
                    var queryBookCover = "INSERT INTO dbo.bookCover " +
                    "(title, authorName, thumbnailUrl, imageUrl, portfolioOrder, showInPortfolio, genreId) " +
                    "VALUES (@title, @authorName, @thumbnailUrl, @imageUrl, @portfolioOrder, @showInPortfolio, @genreId);" +
                    "SELECT LAST_INSERT_ID()";

                    var parametersBC = new DynamicParameters();
                    parametersBC.Add("title", premadeDto.BookCover.Title, DbType.String);
                    parametersBC.Add("authorName", premadeDto.BookCover.AuthorName, DbType.String);
                    parametersBC.Add("thumbnailUrl", premadeDto.BookCover.ThumbnailUrl, DbType.String);
                    parametersBC.Add("imageUrl", premadeDto.BookCover.ImageUrl, DbType.String);
                    parametersBC.Add("portfolioOrder", premadeDto.BookCover.PortfolioOrder, DbType.Int32);
                    parametersBC.Add("showInPortfolio", premadeDto.BookCover.ShowInPortfolio, DbType.Boolean);
                    parametersBC.Add("genreId", premadeDto.BookCover.GenreId, DbType.Int32);

                    var result = await connection.QueryAsync<int>(queryBookCover, parametersBC, transaction: transaction);
                    int bookCoverId = result.Single();

                    var queryPremade = "INSERT INTO premade " +
                    "(bookCoverId, code, price, sold, displayInStore, premadeOrder, dateAdded, purchaseDate, seriesId)" +
                    "VALUES (@bookCoverId, @code, @price, @sold, @displayInStore, @premadeOrder, GETDATE(), @purchaseDate, @seriesId);" +
                    "SELECT LAST_INSERT_ID()";

                    var parametersP = new DynamicParameters();
                    parametersP.Add("bookCoverId", bookCoverId, DbType.Int32);
                    parametersP.Add("code", premadeDto.Code, DbType.String);
                    parametersP.Add("price", premadeDto.Price, DbType.Decimal);
                    parametersP.Add("sold", premadeDto.Sold, DbType.Boolean);
                    parametersP.Add("displayInStore", premadeDto.DisplayInStore, DbType.Boolean);
                    parametersP.Add("premadeOrder", premadeDto.PremadeOrder, DbType.Int32);
                    parametersP.Add("dateAdded", premadeDto.DateAdded, DbType.DateTime2);
                    parametersP.Add("purchaseDate", premadeDto.PurchaseDate, DbType.DateTime2);
                    parametersP.Add("seriesId", premadeDto.SeriesId, DbType.Int32);

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

        public async Task Update(PremadeDTO premadeDto)
        {
            using (var connection = _context.CreateConnection())
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    var queryPremade = "UPDATE premade " +
                    "SET bookCoverId = @bookCoverId," +
                    "code = @code," +
                    "price = @price," +
                    "sold = @sold," +
                    "displayInStore = @displayInStore," +
                    "premadeOrder = @premadeOrder," +
                    "dateAdded = @dateAdded," +
                    "purchaseDate = @purchaseDate," +
                    "seriesId = @seriesId " +
                    "WHERE premadeId = @premadeId";

                    var parametersP = new DynamicParameters();
                    parametersP.Add("premadeId", premadeDto.PremadeId, DbType.Int32);
                    parametersP.Add("bookCoverId", premadeDto.BookCoverId, DbType.Int32);
                    parametersP.Add("code", premadeDto.Code, DbType.String);
                    parametersP.Add("price", premadeDto.Price, DbType.Decimal);
                    parametersP.Add("sold", premadeDto.Sold, DbType.Boolean);
                    parametersP.Add("displayInStore", premadeDto.DisplayInStore, DbType.Boolean);
                    parametersP.Add("premadeOrder", premadeDto.PremadeOrder, DbType.Int32);
                    parametersP.Add("dateAdded", premadeDto.DateAdded, DbType.DateTime2);
                    parametersP.Add("purchaseDate", premadeDto.PurchaseDate, DbType.DateTime2);
                    parametersP.Add("seriesId", premadeDto.SeriesId, DbType.Int32);

                    await connection.QueryAsync(queryPremade, parametersP, transaction: transaction);

                    var queryBookCover = "UPDATE dbo.BookCover " +
                    "SET title = @title, " +
                    "authorName = @authorName," +
                    "thumbnailUrl = @thumbnailUrl, " +
                    "imageUrl = @imageUrl, " +
                    "portfolioOrder = @portfolioOrder," +
                    "showInPortfolio = @showInPortfolio, " +
                    "genreId = @genreId " +
                    "WHERE BookCoverId = @bookCoverId";

                    var parametersBC = new DynamicParameters();
                    parametersBC.Add("bookCoverId", premadeDto.BookCoverId, DbType.Int32);
                    parametersBC.Add("title", premadeDto.BookCover.Title, DbType.String);
                    parametersBC.Add("authorName", premadeDto.BookCover.AuthorName, DbType.String);
                    parametersBC.Add("thumbnailUrl", premadeDto.BookCover.ThumbnailUrl, DbType.String);
                    parametersBC.Add("imageUrl", premadeDto.BookCover.ImageUrl, DbType.String);
                    parametersBC.Add("portfolioOrder", premadeDto.BookCover.PortfolioOrder, DbType.Int32);
                    parametersBC.Add("showInPortfolio", premadeDto.BookCover.ShowInPortfolio, DbType.String);
                    parametersBC.Add("genreId", premadeDto.BookCover.GenreId, DbType.Int32);

                    await connection.QueryAsync(queryBookCover, parametersBC, transaction: transaction);

                    transaction.Commit();
                }
            }
        }

        public async Task Delete(int id)
        {
            var query = "DELETE FROM premade WHERE premadeId = @id";

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
