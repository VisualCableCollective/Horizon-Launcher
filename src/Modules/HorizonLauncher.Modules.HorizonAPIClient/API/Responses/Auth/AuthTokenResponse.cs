using Newtonsoft.Json;

namespace HorizonLauncher.Modules.HorizonAPIClient.API.Responses.Auth
{
    internal class AuthTokenResponse
    {
        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }

        internal static AuthTokenResponse Deserialize(string json)
        {
            return JsonConvert.DeserializeObject<AuthTokenResponse>(json);
        }
    }
}
