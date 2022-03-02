using BookCoversApi.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookCoversApi.DTO;

namespace BookCoversApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeriesController : ControllerBase
    {
        private readonly ISeriesRepository _seriesRepository;

        public SeriesController(ISeriesRepository seriesRepository)
        {
            _seriesRepository = seriesRepository;
        }

        [HttpGet("{id}", Name = "GetSeriesBySeriesId")]
        [Route("GetSeriesBySeriesId/{id}")]
        public async Task<IActionResult> GetSeriesBySeriesId(int id)
        {
            try
            {
                var series = await _seriesRepository.GetSeriesBySeriesId(id);

                if (series == null)
                {
                    return NotFound();
                }

                var seriesResult = series.ConvertToDTO();
                return Ok(series);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}", Name = "GetSeriesByPremadeId")]
        [Route("GetSeriesByPremadeId/{id}")]
        public async Task<IActionResult> GetSeriesByPremadeId(int id)
        {
            try
            {
                var series = await _seriesRepository.GetSeriesByPremadeId(id);

                if (series == null)
                {
                    return NotFound();
                }

                var seriesResult = series.ConvertToDTO();
                return Ok(series);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("CreateSeries")]
        public async Task<IActionResult> CreateSeries([FromBody]SeriesDTO seriesDto)
        {
            try
            {
                if (seriesDto == null)
                {
                    return BadRequest("Series object is null");
                }

                var createdSeries = await _seriesRepository.CreateSeries(seriesDto);

                return CreatedAtRoute("GetSeriesBySeriesId", new { id = createdSeries.SeriesId }, createdSeries);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost]
        [Route("AddPremadeToSeries")]
        public async Task<IActionResult> AddPremadeToSeries(PremadeSeriesDTO premadeSeriesDto)
        {
            try
            {
                if (premadeSeriesDto == null)
                {
                    return BadRequest("PremadeSeries object is null");
                }

                await _seriesRepository.AddPremadeToSeries(premadeSeriesDto);

                var series = new Entities.Series
                {
                    SeriesId = premadeSeriesDto.SeriesId
                };

                return CreatedAtRoute("GetSeriesBySeriesId", new { id = series.SeriesId }, series);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("RemovePremadeFromSeries/{premadeId}")]
        public async Task<IActionResult> RemovePremadeFromSeries(int premadeId)
        {
            try
            {
                var dbSeries = await _seriesRepository.GetSeriesByPremadeId(premadeId);
                if (dbSeries == null)
                {
                    return NotFound();
                }

                await _seriesRepository.RemovePremadeFromSeries(premadeId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSeries(int id, SeriesDTO seriesDto)
        {
            try
            {
                var dbSeries = await _seriesRepository.GetSeriesBySeriesId(id);
                if (dbSeries == null)
                {
                    return NotFound();
                }

                await _seriesRepository.UpdateSeries(id, seriesDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteSeries/{id}")]
        public async Task<IActionResult> DeleteSeries(int id)
        {
            try
            {
                var dbSeries = await _seriesRepository.GetSeriesBySeriesId(id);
                if (dbSeries == null)
                {
                    return NotFound();
                }

                await _seriesRepository.DeleteSeries(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
