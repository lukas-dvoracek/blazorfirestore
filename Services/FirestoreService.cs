using System.Net;
using System.Threading.Tasks;
using blazorfirestore.Pages;
using Microsoft.JSInterop;
using static blazorfirestore.Services.Objects;

namespace Services
{
    public class FirestoreService
    {
        private readonly IJSRuntime _jsRuntime;
        public FirestoreService(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
        }
        public async Task AddUserAsync(string userName, string userRole)
        {
            await _jsRuntime.InvokeVoidAsync("addUser", new
            {
                DisplayName = userName,
                Role = userRole
            });
            // Clears the input box
            userName = null;
            userRole = null;
        }

        public async Task<List<User>> GetUsersAsync()
        {
            var users = await _jsRuntime.InvokeAsync<User[]>("window.getUsers");
            return users.ToList();
        }

        public async Task DeleteUserAsync(string userId)
        {
            await _jsRuntime.InvokeVoidAsync("deleteUser", userId);
        }


        public async Task<List<Book>> GetBooksAsync()
        {
            var books = await _jsRuntime.InvokeAsync<Book[]>("getBooks");
            var users = await GetUsersDictionaryAsync(); // Načti všechny uživatele do slovníku

            // Přiřazení jména autora podle AuthorId
            foreach (var book in books)
            {
                if (users.TryGetValue(book.AuthorId, out var userName))
                {
                    book.AuthorName = userName;
                }
                else
                {
                    book.AuthorName = "Neznámý autor"; // Fallback pro neznámé autory
                }
            }

            return books.ToList();
        }

        private async Task<Dictionary<string, string>> GetUsersDictionaryAsync()
        {
            var users = await _jsRuntime.InvokeAsync<User[]>("getUsers");
            return users.ToDictionary(u => u.Id, u => u.UserName);
        }

		// 📖 Získání knihy podle jejího ID
		public async Task<Book> GetBookByIdAsync(string bookId)
		{
			var bookById = await _jsRuntime.InvokeAsync<Book>("getBookById", bookId);
			var users = await GetUsersDictionaryAsync(); // Načti všechny uživatele do slovníku

			// Přiřazení jména autora podle AuthorId

			{
				if (users.TryGetValue(bookById.AuthorId, out var userName))
				{
					bookById.AuthorName = userName;
				}
				else
				{
					bookById.AuthorName = "Neznámý autor"; // Fallback pro neznámé autory
				}
			}
			return bookById;
		}

		// 📚 Získání všech knih podle uživatele
		public async Task<List<Book>> GetBooksByUserIdAsync(string userId)
		{
			var books = await _jsRuntime.InvokeAsync<Book[]>("getBooksByUserId", userId);
			var users = await GetUsersDictionaryAsync(); // Načti všechny uživatele do slovníku

			// Přiřazení jména autora podle AuthorId
			foreach (var book in books)
			{
				if (users.TryGetValue(book.AuthorId, out var userName))
				{
					book.AuthorName = userName;
				}
				else
				{
					book.AuthorName = "Neznámý autor"; // Fallback pro neznámé autory
				}
			}
			return books.ToList(); // Return the first book or null if no books found
		}

	}

}
