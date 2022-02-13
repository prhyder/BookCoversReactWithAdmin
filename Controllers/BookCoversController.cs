using BookCoversApi.Interfaces;
using BookCoversApi.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookCoversApi.Entities;

namespace BookCoversApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookCoversController : ControllerBase
    {
        private readonly IBookCoverRepository _bookCoverRepository;

        public BookCoversController(IBookCoverRepository bookCoverRepository)
        {
            _bookCoverRepository = bookCoverRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookCovers()
        {
            try
            {
                var bookCovers = await _bookCoverRepository.GetBookCovers();
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBookCover(int id, BookCoverDTO bookCoverDto)
        {
            try
            {
                var dbBookCover = await _bookCoverRepository.GetById(id);
                if (dbBookCover == null)
                {
                    return NotFound();
                }

                await _bookCoverRepository.Update(id, bookCoverDto);
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
