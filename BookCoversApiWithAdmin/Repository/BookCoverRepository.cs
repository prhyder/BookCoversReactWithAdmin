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
            var query = "SELECT * FROM bookCover";

            using (var connection = _context.CreateConnection())
            {
                var bookCovers = await connection.QueryAsync<BookCover>(query);
                return bookCovers.ToList();
            }
        }

        public async Task<BookCover> GetById(int id)
        {
            var query = "SELECT * FROM bookCover WHERE bookCoverId = @id";

            using (var connection = _context.CreateConnection())
            {
                var bookCover = await connection.QuerySingleOrDefaultAsync<BookCover>(query, new { id });
                return bookCover;
            }
        }

        public async Task<BookCover> Add(BookCoverDTO bookCoverDto)
        {
            var query = "INSERT INTO bookCover " +
                "(title, authorName, thumbnailUrl, imageUrl, portfolioOrder, showInPortfolio, genreId) " +
                "VALUES (@title, @authorName, @thumbnailUrl, @imageUrl, @portfolioOrder, @showInPortfolio, @genreId);" +
                "SELECT LAST_INSERT_ID()";

            var parameters = new DynamicParameters();
            parameters.Add("title", bookCoverDto.Title, DbType.String);
            parameters.Add("authorName", bookCoverDto.AuthorName, DbType.String);
            parameters.Add("thumbnailUrl", bookCoverDto.ThumbnailUrl, DbType.String);
            parameters.Add("imageUrl", bookCoverDto.ImageUrl, DbType.String);
            parameters.Add("portfolioOrder", bookCoverDto.PortfolioOrder, DbType.Int32);
            parameters.Add("showInPortfolio", bookCoverDto.ShowInPortfolio, DbType.Boolean);
            parameters.Add("genreId", bookCoverDto.GenreId, DbType.Int32);

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

        public async Task Update(BookCoverDTO bookCover)
        {
            var query = "UPDATE bookCover " +
                "SET title = @Title, " +
                "authorName = @AuthorName, " +
                "thumbnailUrl = @ThumbnailUrl, " +
                "imageUrl = @ImageUrl, " +
                "portfolioOrder = @PortfolioOrder, " +
                "showInPortfolio = @ShowInPortfolio, " +
                "genreId = @GenreId " +
                "WHERE bookCoverId = @BookCoverId";

            var parameters = new DynamicParameters();
            parameters.Add("bookCoverId", bookCover.BookCoverId, DbType.Int32);
            parameters.Add("title", bookCover.Title, DbType.String);
            parameters.Add("authorName", bookCover.AuthorName, DbType.String);
            parameters.Add("thumbnailUrl", bookCover.ThumbnailUrl, DbType.String);
            parameters.Add("imageUrl", bookCover.ImageUrl, DbType.String);
            parameters.Add("portfolioOrder", bookCover.PortfolioOrder, DbType.Int32);
            parameters.Add("showInPortfolio", bookCover.ShowInPortfolio, DbType.Byte);
            parameters.Add("genreId", bookCover.GenreId, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task Delete(int id)
        {
            var query = "DELETE FROM bookCover WHERE bookCoverId = @id";

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
