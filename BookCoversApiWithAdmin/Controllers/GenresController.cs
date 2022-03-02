using BookCoversApi.DTO;
using BookCoversApi.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly IGenreRepository _genreRepository;

        public GenresController(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetGenres()
        {
            try
            {
                var genres = await _genreRepository.GetGenres();
                var genresResult = genres.ConvertToDTO();

                return Ok(genresResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}", Name = "GetGenreById")]
        public async Task<IActionResult> GetGenreById(int id)
        {
            try
            {
                var genre = await _genreRepository.GetById(id);

                if (genre == null)
                {
                    return NotFound();
                }
                else
                {
                    var genreResult = genre.ConvertToDTO();
                    return Ok(genreResult);
                }                
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateGenre([FromBody]GenreDTO genreDto)
        {
            try
            {
                if (genreDto == null)
                {
                    return BadRequest("Genre object is null");
                }

                var createdGenre = await _genreRepository.Add(genreDto);

                return CreatedAtRoute("GetGenreById", new { id = createdGenre.GenreId }, createdGenre);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGenre(int id, GenreDTO genreDto)
        {
            try
            {
                var dbGenre = await _genreRepository.GetById(id);
                if (dbGenre == null)
                {
                    return NotFound();
                }

                await _genreRepository.Update(id, genreDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            try
            {
                var dbGenre = await _genreRepository.GetById(id);
                if (dbGenre == null)
                {
                    return NotFound();
                }

                await _genreRepository.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
