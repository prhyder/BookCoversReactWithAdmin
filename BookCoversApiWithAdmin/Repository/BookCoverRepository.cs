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
    public class BookCoverRepository : IBookCoverRepository
    {
        private readonly DapperContext _context;

        public BookCoverRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<IList<BookCover>> GetBookCovers()
        {
            var query = "SELECT * FROM dbo.BookCover";

            using (var connection = _context.CreateConnection())
            {
                var bookCovers = await connection.QueryAsync<BookCover>(query);
                return bookCovers.ToList();
            }
        }

        public async Task<BookCover> GetById(int id)
        {
            var query = "SELECT * FROM dbo.BookCover WHERE BookCoverId = @id";

            using (var connection = _context.CreateConnection())
            {
                var bookCover = await connection.QuerySingleOrDefaultAsync<BookCover>(query, new { id });
                return bookCover;
            }
        }

        public async Task<BookCover> Add(BookCoverDTO bookCoverDto)
        {
            var query = "INSERT INTO dbo.BookCover " +
                "(Title, AuthorName, ThumbnailUrl, ImageUrl, PortfolioOrder, ShowInPortfolio, GenreId) " +
                "VALUES (@Title, @AuthorName, @ThumbnailUrl, @ImageUrl, @PortfolioOrder, @ShowInPortfolio, @GenreId);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("Title", bookCoverDto.Title, DbType.String);
            parameters.Add("AuthorName", bookCoverDto.AuthorName, DbType.String);
            parameters.Add("ThumbnailUrl", bookCoverDto.ThumbnailUrl, DbType.String);
            parameters.Add("ImageUrl", bookCoverDto.ImageUrl, DbType.String);
            parameters.Add("PortfolioOrder", bookCoverDto.PortfolioOrder, DbType.Int32);
            parameters.Add("ShowInPortfolio", bookCoverDto.ShowInPortfolio, DbType.Boolean);
            parameters.Add("GenreId", bookCoverDto.GenreId, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                var bookCoverId = await connection.QuerySingleAsync<int>(query, parameters);

                var createdBookCover = new BookCover
                {
                    BookCoverId = bookCoverId,
                    Title = bookCoverDto.Title,
                    AuthorName = bookCoverDto.AuthorName,
                    ThumbnailUrl = bookCoverDto.ThumbnailUrl,
                    ImageUrl = bookCoverDto.ImageUrl,
                    PortfolioOrder = bookCoverDto.PortfolioOrder,
                    ShowInPortfolio = bookCoverDto.ShowInPortfolio,
                    GenreId = bookCoverDto.GenreId
                };

                return createdBookCover;

            }
        }

        public async Task Update(int id, BookCoverDTO bookCover)
        {
            var query = "UPDATE dbo.BookCover " +
                "SET Title = @Title, " +
                "AuthorName = @AuthorName," +
                "ThumbnailUrl = @ThumbnailUrl, " +
                "ImageUrl = @ImageUrl, " +
                "PortfolioOrder = @PortfolioOrder," +
                "ShowInPortfolio = @ShowInPortfolio, " +
                "GenreId = @GenreId " +
                "WHERE BookCoverId = @BookCoverId";

            var parameters = new DynamicParameters();
            parameters.Add("BookCoverId", id, DbType.Int32);
            parameters.Add("Title", bookCover.Title, DbType.String);
            parameters.Add("AuthorName", bookCover.AuthorName, DbType.String);
            parameters.Add("ThumbnailUrl", bookCover.ThumbnailUrl, DbType.String);
            parameters.Add("ImageUrl", bookCover.ImageUrl, DbType.String);
            parameters.Add("PortfolioOrder", bookCover.PortfolioOrder, DbType.Int32);
            parameters.Add("ShowInPortfolio", bookCover.ShowInPortfolio, DbType.String);
            parameters.Add("GenreId", bookCover.GenreId, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task Delete(int id)
        {
            var query = "DELETE FROM dbo.BookCover WHERE BookCoverId = @id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }

        public Task UpdatePortfolioOrder(int bookCoverId, int order)
        {
            throw new NotImplementedException();
        }
        
    }
}
