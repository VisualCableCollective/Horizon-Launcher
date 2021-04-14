using System;

namespace HorizonLauncher.Modules.HorizonAPIClient
{
    public class HorizonAPIClient
    {
        public HorizonAPIClientConfig Config;
        public HorizonAPIClient(HorizonAPIClientConfig config = null)
        {
            if(config == null)
            {
                Config = new HorizonAPIClientConfig();
            }
            else
            {
                Config = config;
            }
        }

        /// <summary>
        ///     Deserializes the JSON response and sets <see cref="HorizonAPIClientConfig.AuthorizationToken"/>.
        /// </summary>
        /// <param name="jsonResponse"></param>
        public void SetAuthTokenFromAuthTokenResponse(String jsonResponse)
        {
            API.Responses.Auth.AuthTokenResponse responseModel;
            try
            {
                responseModel = API.Responses.Auth.AuthTokenResponse.Deserialize(jsonResponse);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

            if (String.IsNullOrWhiteSpace(responseModel.Token))
                throw new Exception("The provided response doesn't contain a token.");

            Config.AuthorizationToken = responseModel.Token;
        }
    }
}
