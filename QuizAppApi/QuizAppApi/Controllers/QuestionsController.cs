using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAppApi.models;

namespace QuizAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly QuizDBContext _context;

        public QuestionsController(QuizDBContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Questions>>> GetRandomQuestions()
        {
            // Get the total count of questions
            int totalQuestions = await _context.QuestionsTable.CountAsync();

            // Select five random questions
            var randomQuestions = await _context.QuestionsTable
                .OrderBy(q => Guid.NewGuid()) // Order by a new GUID to randomize
                .Take(5)                      // Take 5 random questions
                .ToListAsync();

            return Ok(randomQuestions);
        }

        [Authorize(Roles ="Admin")]
        [HttpGet("all", Name = "getAllQuestions")]

        public async Task<ActionResult<IEnumerable<Questions>>> GetAllQuestions()
        {
            var questions = await _context.QuestionsTable.ToListAsync();
            return Ok(questions);
        }


        // GET: api/Questions/5
        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Questions>> GetQuestions(int id)
        {
            var questions = await _context.QuestionsTable.FindAsync(id);

            if (questions == null)
            {
                return NotFound();
            }

            return questions;
        }

        // PUT: api/Questions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestions(int id, Questions questions)
        {
            if (id != questions.QuestionId)
            {
                return BadRequest();
            }

            _context.Entry(questions).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionsExists(id))
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

        // POST: api/Questions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Questions>> PostQuestions(Questions questions)
        {
            _context.QuestionsTable.Add(questions);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestions", new { id = questions.QuestionId }, questions);
        }

        // DELETE: api/Questions/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestions(int id)
        {
            var questions = await _context.QuestionsTable.FindAsync(id);
            if (questions == null)
            {
                return NotFound();
            }

            _context.QuestionsTable.Remove(questions);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionsExists(int id)
        {
            return _context.QuestionsTable.Any(e => e.QuestionId == id);
        }
    }
}
