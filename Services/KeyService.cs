using System.Net.Http.Json;
using Shared;
using static System.Net.WebRequestMethods;

namespace Services
{
	public class KeyService
	{
		private readonly HttpClient _httpClient;

		public KeyService(HttpClient httpClient)
		{
			_httpClient = httpClient;
		}

		public async Task<ApiKeys> GetKeysAsync()
		{
			try
			{
				var keys = await _httpClient.GetFromJsonAsync<ApiKeys>("https://us-central1-webapp-8dc15.cloudfunctions.net/getKeys");
				if (keys == null)
				{
					throw new Exception("Chyba při získávání klíčů: Data jsou prázdná.");
				}
				return keys;
			}
			catch (Exception ex)
			{
				// Můžeš zde logovat chybu nebo vrátit vlastní zprávu
				throw new Exception("Chyba při komunikaci s Firebase: " + ex.Message);
			}
		}
	}
}
