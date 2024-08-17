using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAppApi.models;

namespace QuizAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantsController : ControllerBase
    {
        private readonly QuizDBContext _context;

        public ParticipantsController(QuizDBContext context)
        {
            _context = context;
        }

        // GET: api/Participants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipantsTable()
        {
            return await _context.ParticipantsTable.ToListAsync();
        }

        // GET: api/Participants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Participant>> GetParticipant(int id)
        {
            var participant = await _context.ParticipantsTable.FindAsync(id);

            if (participant == null)
            {
                return NotFound();
            }

            return participant;
        }

        // PUT: api/Participants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticipant(int id, Participant participant)
        {
            if (id != participant.ParticipantId)
            {
                return BadRequest();
            }

            _context.Entry(participant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParticipantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Participants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
            // Check if the participant with the same email and name already exists
            var existingParticipant = _context.ParticipantsTable
                                              .Where(x => x.Email == participant.Email && x.Name == participant.Name)
                                              .FirstOrDefault();

            if (existingParticipant == null)
            {
                // If the participant does not exist, add a new entry
                _context.ParticipantsTable.Add(participant);
            }
            else
            {
                // If the participant exists, update the score and time taken
                existingParticipant.Score = participant.Score;
                existingParticipant.Timetaken = participant.Timetaken;

                // Optionally, update other fields if necessary
                // existingParticipant.OtherField = participant.OtherField;

                _context.ParticipantsTable.Update(existingParticipant);
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return the updated or newly created participant
            return Ok(existingParticipant ?? participant);
        }


        // DELETE: api/Participants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParticipant(int id)
        {
            var participant = await _context.ParticipantsTable.FindAsync(id);
            if (participant == null)
            {
                return NotFound();
            }

            _context.ParticipantsTable.Remove(participant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParticipantExists(int id)
        {
            return _context.ParticipantsTable.Any(e => e.ParticipantId == id);
        }
    }
}
