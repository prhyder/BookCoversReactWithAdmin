using BookCoversApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.DTO
{
    public static class GenreDTOMapper
    {
        public static GenreDTO ConvertToDTO(this Genre genre)
        {
            return new GenreDTO
            {
                GenreId = genre.GenreId,
                Name = genre.Name
            };
        }

        public static IList<GenreDTO> ConvertToDTO(this IList<Genre> genres)
        {
            return genres.Select(genre => genre.ConvertToDTO()).ToList();
        }
    }
}
