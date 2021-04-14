using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HorizonLauncher.Modules.HorizonAPIClient
{
    /// <summary>
    ///     Represents a configuration class for <see cref="HorizonAPIClient"/>.
    /// </summary>
    public class HorizonAPIClientConfig
    {
        /// <summary>
        ///     Authorization token for the interaction of the Horizon API.
        /// </summary>
        public String AuthorizationToken { get; set; }

        /// <summary>
        ///     Represents the UserAgent header in the HTTP requests.
        /// </summary>
        public String HTTPUserAgent { get; set; } = "Horizon API Client .NET";
    }
}
