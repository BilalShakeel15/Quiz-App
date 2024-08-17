using Microsoft.EntityFrameworkCore;

namespace QuizAppApi.models
{
    public class QuizDBContext: DbContext
    {
        public QuizDBContext(DbContextOptions<QuizDBContext> options): base(options)
        {

        }

        public DbSet<Questions> QuestionsTable { get; set; }

        public DbSet<Participant> ParticipantsTable { get; set; }
       
    }
}
