using BookCoversApi.Interfaces;
using BookCoversApi.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookCoversApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace BookCoversApi.Controllers
{
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    public class BookCoversController : ControllerBase
    {
        private readonly IBookCoverRepository _bookCoverRepository;
        private readonly IGenreRepository _genreRepository;

        public BookCoversController(IBookCoverRepository bookCoverRepository, IGenreRepository genreRepository)
        {
            _bookCoverRepository = bookCoverRepository;
            _genreRepository = genreRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookCovers()
        {
            try
            {
                var bookCovers = await _bookCoverRepository.GetBookCovers();
                var genres = await _genreRepository.GetGenres();
                foreach(BookCover bookCover in bookCovers)
                {
                    bookCover.Genre = bookCover.GenreId == null ? null : new Genre { GenreId = (int)bookCover.GenreId, Name = genres.FirstOrDefault(x => x.GenreId == bookCover.GenreId).Name };
                }
                var bookCoverResult = bookCovers.ConvertToDTO();

                return Ok(bookCoverResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}", Name = "GetBookCoverById")]
        public async Task<IActionResult> GetBookCoverById(int id)
        {
            try
            {
                var bookCover = await _bookCoverRepository.GetById(id);

                if (bookCover == null)
                {
                    return NotFound();
                }
                else
                {
                    var bookCoverResult = bookCover.ConvertToDTO();
                    return Ok(bookCoverResult);
                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateBookCover([FromBody]BookCoverDTO bookCoverDto)
        {
            try
            {
                if (bookCoverDto == null)
                {
                    return BadRequest("BookCover object is null");
                }

                var createdBookCover = await _bookCoverRepository.Add(bookCoverDto);

                return CreatedAtRoute("GetBookCoverById", new { id = createdBookCover.BookCoverId}, createdBookCover);
            }
            catch( Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateBookCover(BookCoverDTO bookCoverDto)
        {
            try
            {
                var dbBookCover = await _bookCoverRepository.GetById(bookCoverDto.BookCoverId);
                if (dbBookCover == null)
                {
                    return NotFound();
                }

                await _bookCoverRepository.Update(bookCoverDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookCover(int id)
        {
            try
            {
                var dbBookCover = await _bookCoverRepository.GetById(id);
                if (dbBookCover == null)
                {
                    return NotFound();
                }

                await _bookCoverRepository.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
