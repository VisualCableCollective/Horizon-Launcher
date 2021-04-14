using System;
using System.IO;

namespace Horizon_Launcher
{
    public static class AppInfo
    {
        public static readonly string DataFolder = Path.Join(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),  @"\Horizon Launcher\");

        //Horizon API

        //WebSockets
        public static readonly String HorizonAPI_WSHost = "localhost:6001";
        public static readonly String HorizonAPI_WSAuthEndpointURL = "http://localhost:8000/broadcasting/auth";
        public static readonly String HorizonAPI_WSAppKey = "de89hDFJ34nfeunhui";
    }
}
