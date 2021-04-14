using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HorizonLauncher.Models.Config
{
    public class Config
    {
        [JsonProperty("horizon_auth_token")]
        public string HorizonAuthToken { get; set; }
    }
}
