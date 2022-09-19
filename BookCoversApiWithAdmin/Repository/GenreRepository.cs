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
    public class GenreRepository : IGenreRepository
    {
        private readonly DapperContext _context;

        public GenreRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<IList<Genre>> GetGenres()
        {
            var query = "SELECT * FROM genre";

            using (var connection = _context.CreateConnection())
            {
                var genres = await connection.QueryAsync<Genre>(query);
                return genres.ToList();
            }
        }

        public async Task<Genre> GetById(int id)
        {
            var query = "SELECT * FROM genre WHERE genreId = @id";

            using (var connection = _context.CreateConnection())
            {
                var genre = await connection.QuerySingleOrDefaultAsync<Genre>(query, new { id });
                return genre;
            }
        }

        public async Task<Genre> Add(GenreDTO genre)
        {
            var query = "INSERT INTO genre (name) VALUES (@name);" +
                "SELECT LAST_INSERT_ID()";

            var parameters = new DynamicParameters();
            parameters.Add("name", genre.Name, DbType.String);
            
            using (var connection = _context.CreateConnection())
            {
                var genreId = await connection.QuerySingleAsync<int>(query, parameters);

                var createdGenre = new Genre
                {
                    GenreId = genreId,
                    Name = genre.Name
                };

                return createdGenre;
            }
        }

        public async Task Update(GenreDTO genre)
        {
            var query = "UPDATE genre SET name = @name WHERE genreId = @genreId";

            var parameters = new DynamicParameters();
            parameters.Add("GenreId", genre.GenreId, DbType.Int32);
            parameters.Add("Name", genre.Name, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task Delete(int id)
        {
            var query = "DELETE FROM genre WHERE genreId = @id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }
        
    }
}
