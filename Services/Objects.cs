using System.ComponentModel.DataAnnotations;

namespace blazorfirestore.Services
{
    public class Objects
    {
        // A class to represent a user
        public class User
        {
            public string? Id { get; set; }
            public string? UserName { get; set; }
            public string? UserRole { get; set; }
        }
        public class Book
        {
            public string? Id { get; set; }
            public string? Title { get; set; }
            public string? AuthorId { get; set; } // ID autora
            public string? AuthorName { get; set; } // Jméno autora
            public string? Genre { get; set; }
			public string? Content { get; set; }
			//public TimestampAttribute? DatePublished { get; set; }
		}
    }
}
