using BookCoversApi.DTO;
using BookCoversApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.Interfaces
{
    public interface IGenreRepository
    {
        public Task<IList<Genre>> GetGenres();
        public Task<Genre> GetById(int id);
        public Task<Genre> Add(GenreDTO genre);
        public Task Update(int id, GenreDTO genre);
        public Task Delete(int id);
    }
}
