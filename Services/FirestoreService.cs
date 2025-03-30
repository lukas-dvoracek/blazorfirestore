using blazorfirestore.Pages;
using Microsoft.JSInterop;
using System.Threading.Tasks;
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
    }

}
