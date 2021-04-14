using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace Horizon_Launcher.Controllers
{
    /// <summary>
    /// Management of the configuration file
    /// </summary>
    public static class ConfigController
    {
        /// <summary>
        /// Indicates whether the controller was successfully initialized.
        /// </summary>
        private static bool InitDone = false;
        private static String LogPrefix = "[" + nameof(ConfigController) + "] ";
        public static string ErrorMessage { get; private set; }

        private static String ConfigFilePath;

        private static StreamReader ConfigStreamReader;

        private static Timer SaveConfigAfterConfigChangeTimer;

        public static Models.Config ConfigData { get; private set; }

        public static void SetConfig(Models.Config config)
        {
            ConfigData = config;
            ConfigWasUpdated();
        }

        /// <summary>
        /// Initializes the controller. Called by the <see cref="ControllerManager"/>.
        /// </summary>
        /// <returns>Controller Initialization Status</returns>
        public static Models.ControllerStatus Init()
        {
            ConfigFilePath = Path.Combine(AppInfo.DataFolder, "config.json");
            SaveConfigAfterConfigChangeTimer = new Timer(1000);
            SaveConfigAfterConfigChangeTimer.Elapsed += SaveConfigAfterConfigChangeTimer_Elapsed; ;

            if (!InitConfigFile())
                return Models.ControllerStatus.FatalErrorEM;

            LoadConfig();
            ConfigStreamReader.Dispose();

            InitDone = true;

            return Models.ControllerStatus.OK;
        }

        private static void SaveConfigAfterConfigChangeTimer_Elapsed(object sender, ElapsedEventArgs e)
        {
            SaveConfigAfterConfigChangeTimer.Stop();
            SaveConfig();
        }

        private static bool InitConfigFile()
        {
            try
            {
                ConfigStreamReader = new StreamReader(File.Open(ConfigFilePath, FileMode.OpenOrCreate));
            }catch(Exception ex)
            {
                LogController.WriteLine(LogPrefix + "The configuration file could not be opened or created. Error: " + ex.Message, LogController.LogType.Error);
                ErrorMessage = "The configuration file could not be opened or created. Error: " + ex.Message;
                return false;
            }
            return true;
        }

        private static void LoadConfig()
        {
            String ConfigFileContent = ConfigStreamReader.ReadToEnd();
            if (!String.IsNullOrWhiteSpace(ConfigFileContent))
            {
                try
                {
                    ConfigData = JsonConvert.DeserializeObject<Models.Config>(ConfigFileContent);
                    return;
                }
                catch (Exception ex)
                {
                    LogController.WriteLine(LogPrefix + "Could not convert config file. Therefore a new config will be created. Error: " + ex.Message, LogController.LogType.Warning);
                }
            }

            ConfigData = new Models.Config();
        }

        private static bool SaveConfig()
        {
            String ConfigFileContent = JsonConvert.SerializeObject(ConfigData);

            try
            {
                File.WriteAllText(ConfigFilePath, ConfigFileContent, Encoding.UTF8);
            }catch(Exception ex)
            {
                LogController.WriteLine(LogPrefix + "Could not save the configuration file. Error: " + ex.Message, LogController.LogType.Error);
                ErrorMessage = "Could not save the configuration file. Error: " + ex.Message;
                return false;
            }

            LogController.WriteLine(LogPrefix + "Saved configuration", LogController.LogType.Debug);
            return true;
        }

        private static void ConfigWasUpdated()
        {
            /*
             * We are using a timer here, as it is possible that the configuration may be changed again immediately and 
             * to reduce the system load and prevent possible errors as the configuration file could still be opened for 
             * saving the config while reopening the config for saving a new snapshot of the config.
             */

            LogController.WriteLine(LogPrefix + "Configuration data has been changed", LogController.LogType.Debug);

            SaveConfigAfterConfigChangeTimer.Stop();
            SaveConfigAfterConfigChangeTimer.Start();
        }

        /// <summary>
        /// Shutdowns the controller. Called by the <see cref="ControllerManager"/>.
        /// </summary>
        /// <returns>Controller Shutdown Status</returns>
        public static Models.ControllerStatus ShutDown()
        {
            if (!InitDone)
                return Models.ControllerStatus.InitNotDone;

            if (!SaveConfig())
                return Models.ControllerStatus.FatalErrorEM;

            InitDone = false;

            return Models.ControllerStatus.ShutDownOK;
        }
    }
}
