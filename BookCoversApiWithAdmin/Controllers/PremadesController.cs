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
    public class PremadesController : ControllerBase
    {
        private readonly IPremadeRepository _premadeRepository;

        public PremadesController(IPremadeRepository premadeRepository)
        {
            _premadeRepository = premadeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetPremades()
        {
            try
            {
                var premades = await _premadeRepository.GetPremades();
                var premadesResult = premades.ConvertToDTO();

                return Ok(premadesResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}", Name = "GetPremadeById")]
        public async Task<IActionResult> GetPremadeById(int id)
        {
            try
            {
                var premade = await _premadeRepository.GetById(id);

                if (premade == null)
                {
                    return NotFound();
                }
                else
                {
                    var premadeResult = premade.ConvertToDTO();
                    return Ok(premadeResult);
                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePremade([FromBody]PremadeDTO premadeDto)
        {
            try
            {
                if (premadeDto == null)
                {
                    return BadRequest("Premade object is null");
                }

                var createdPremade = await _premadeRepository.Add(premadeDto);

                return CreatedAtRoute("GetPremadeById", new { id = createdPremade.PremadeId }, createdPremade);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePremade(int id, PremadeDTO premadeDto)
        {
            try
            {
                var dbPremade = await _premadeRepository.GetById(id);
                if (dbPremade == null)
                {
                    return NotFound();
                }

                await _premadeRepository.Update(id, premadeDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePremade(int id)
        {
            try
            {
                var dbPremade = await _premadeRepository.GetById(id);
                if (dbPremade == null)
                {
                    return NotFound();
                }

                await _premadeRepository.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
