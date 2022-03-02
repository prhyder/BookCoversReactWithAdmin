using BookCoversApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.DTO
{
    public static class BookCoverDTOMapper
    {
        public static BookCoverDTO ConvertToDTO(this BookCover bookCover)
        {
            return new BookCoverDTO
            {
                BookCoverId = bookCover.BookCoverId,
                Title = bookCover.Title,
                AuthorName = bookCover.AuthorName,
                ThumbnailUrl = bookCover.ThumbnailUrl,
                ImageUrl = bookCover.ImageUrl,
                PortfolioOrder = bookCover.PortfolioOrder,
                ShowInPortfolio = bookCover.ShowInPortfolio,
                GenreId = bookCover.GenreId
            };
        }

        public static IList<BookCoverDTO> ConvertToDTO(this IList<BookCover> bookCovers)
        {
            return bookCovers.Select(bookCover => bookCover.ConvertToDTO()).ToList();
        }

    }
}
