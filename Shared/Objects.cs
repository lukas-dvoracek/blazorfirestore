using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace Shared
{
    public class Objects
    {
        // A class to represent a user
        public class User
        {
            public string? Id { get; set; }
			public string? UserName { get; set; }
			public string? DisplayName { get; set; }
			public string? UserRole { get; set; }
			public string? Bio { get; set; }
			public string? Email { get; set; }
			public string? ProfileImgUrl { get; set; }
			public TimestampAttribute? RegisteredAt { get; set; }
			public BigInteger? PostCount { get; set; }
			public BigInteger? CommentCount { get; set; }
			public BigInteger? TipCount { get; set; }

		}

		// A class to represent a book
		public class Book
        {
            public string? Id { get; set; }
            public string? Title { get; set; }
			public string? Annotation { get; set; }
			public string? AuthorId { get; set; } // ID autora
            public string? AuthorName { get; set; } // Jméno autora
			public string? Content { get; set; }
			public string? Genre { get; set; }
			public string? Role { get; set; }
			public BigInteger? CommentCount { get; set; }
			public BigInteger? TipCount { get; set; }
			public BigInteger? Seen { get; set; }
			public Boolean Published { get; set; }
			public Boolean Selected { get; set; }
			public TimestampAttribute? CreatedAt { get; set; }

			//public TimestampAttribute? DatePublished { get; set; }
		}

		// A class to represent activities  
		public class Activities
		{
			public string? Id { get; set; }
			public TimestampAttribute? CreatedAt { get; set; }
			public string? TargetId { get; set; }
			public string? TargetType { get; set; }
			public string? UserId { get; set; }
		}

		// A class to represent comments
		public class Comments
		{
			public string? Id { get; set; }
			public string? PostId { get; set; }
			public string? UserId { get; set; }
			public string? Comment { get; set; }
			public TimestampAttribute? CreatedAt { get; set; }
		}
	}
}
