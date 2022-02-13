using BookCoversApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.DTO
{
    public static class PremadeDTOMapper
    {
        public static PremadeDTO ConvertToDTO(this Premade premade)
        {
            return new PremadeDTO { 
                PremadeId = premade.PremadeId,
                BookCoverId = premade.BookCoverId,
                Code = premade.Code,
                Price = premade.Price,
                Sold = premade.Sold,
                DisplayInStore = premade.DisplayInStore,
                PremadeOrder = premade.PremadeOrder,
                DateAdded = premade.DateAdded,
                PurchaseDate = premade.PurchaseDate,
                SeriesId = premade.SeriesId,
                BookCover = new BookCoverDTO
                {
                    BookCoverId = premade.BookCover.BookCoverId,
                    Title = premade.BookCover.Title,
                    AuthorName = premade.BookCover.AuthorName,
                    ThumbnailUrl = premade.BookCover.ThumbnailUrl,
                    ImageUrl = premade.BookCover.ImageUrl,
                    PortfolioOrder = premade.BookCover.PortfolioOrder,
                    ShowInPortfolio = premade.BookCover.ShowInPortfolio,
                    GenreId = premade.BookCover.GenreId
                }
            };
        }

        public static IList<PremadeDTO> ConvertToDTO(this IList<Premade> premades)
        {
            return premades.Select(premade => premade.ConvertToDTO()).ToList();
        }
    }
}
