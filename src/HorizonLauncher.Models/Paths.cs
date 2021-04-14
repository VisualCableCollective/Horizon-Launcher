using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HorizonLauncher.Models
{
    /// <summary>
    ///     Contains all file and folder paths for the Horizon Launcher.
    /// </summary>
    public static class Paths
    {
        // Folders
        public static String AppData
        {
            get
            {
                if (_appData != null)
                    return _appData;

                _appData = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), @"Horizon Launcher\");
                return _appData;
            }
        }
        private static string _appData = null;

        // Files
        public static String ConfigFilePath
        {
            get
            {
                if (_configFilePath != null)
                    return _configFilePath;

                _configFilePath = Path.Combine(AppData, "config.json");
                return _configFilePath;
            }
        }
        private static string _configFilePath = null;

    }
}
