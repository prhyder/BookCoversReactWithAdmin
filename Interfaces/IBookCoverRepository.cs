using BookCoversApi.DTO;
using BookCoversApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.Interfaces
{
    public interface IBookCoverRepository
    {
        public Task<IList<BookCover>> GetBookCovers();
        public Task<BookCover> GetById(int id);
        public Task<BookCover> Add(BookCoverDTO bookCoverDto);
        public Task Update(int id, BookCoverDTO bookCover);
        public Task Delete(int id);
        public Task UpdatePortfolioOrder(int bookCoverId, int order);
    }
}
