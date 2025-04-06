using Firebase.Auth;
using Firebase.Auth.Providers;
using Microsoft.JSInterop;

namespace Services
{
	public class FirebaseAuthService
	{
		private readonly FirebaseAuthClient _authProvider;
		private readonly IJSRuntime _jsRuntime;
		//private string UserUid;

		public string UserUid { get; private set; }
		public string UserEmail { get; private set; }
		public string DisplayName { get; private set; }

		public FirebaseAuthService(IJSRuntime jsRuntime)
		{
			_jsRuntime = jsRuntime;

			var config = new FirebaseAuthConfig
			{
				ApiKey = Environment.GetEnvironmentVariable("FBAPIKey"),
				AuthDomain = "webapp-8dc15.firebaseapp.com",
				Providers = new FirebaseAuthProvider[]
				{
					new EmailProvider()
				}
			};

			_authProvider = new FirebaseAuthClient(config);
		}


		public async Task<string> LoginUser(string email, string password)

		{
			try
			{
				var userCredential = await _authProvider.SignInWithEmailAndPasswordAsync(email, password);
				UserUid = userCredential.User.Uid;            // Uložit do localStorage

				await _jsRuntime.InvokeVoidAsync("localStorage.setItem", "UserUid", UserUid);

				return UserUid;

			}
			catch (Firebase.Auth.FirebaseAuthException ex)
			{
				Console.WriteLine($"Chyba při přihlášení: {ex.Message}");
				return null; // Uživatele nelze najít
			}
		}
		public async Task<string> RegisterUser(string email, string password)
		{
			try
			{
				var userCredential = await _authProvider.CreateUserWithEmailAndPasswordAsync(email, password);
				// mám se přihlásit hned po registraci, nebo vyzvu uživatele, aby se přihlásil?
				UserUid = userCredential.User.Uid;
				await _jsRuntime.InvokeVoidAsync("localStorage.setItem", "UserUid", UserUid);
				return UserUid;
			}
			catch (Firebase.Auth.FirebaseAuthException ex)
			{
				Console.WriteLine($"Chyba při registraci: {ex.Message}");
				return null; // Registrace selhala
			}
		}

		// Odhlášení uživatele
		public void SignOut()
		{
			UserUid = null;
		}

		// Získání stavu přihlášení
		public bool IsUserAuthenticated() => UserUid != null;

		//public void LoadUserFromStorage()
		//{
		//	// Načíst UserUid z localStorage při startu aplikace
		//	UserUid = _jsRuntime.InvokeAsync<string>("localStorage.getItem", "UserUid").Result;
		//}

		public async Task InitAsync()
		{
			UserUid = await _jsRuntime.InvokeAsync<string>("localStorage.getItem", "UserUid");
		}

		public string GetUserUid()
		{
			return UserUid;
		}
	}
}
