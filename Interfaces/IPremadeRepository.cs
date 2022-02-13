using BookCoversApi.DTO;
using BookCoversApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCoversApi.Interfaces
{
    public interface IPremadeRepository
    {
        public Task<IList<Premade>> GetPremades();
        public Task<Premade> GetById(int id);
        public Task<Premade> Add(PremadeDTO premade);
        public Task Update(int id, PremadeDTO premade);
        public Task Delete(int id);
        public Task UpdateOrder(int premadeId, int order, IList<PremadeDTO> premades);
    }
}
