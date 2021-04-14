using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Threading;
using System.IO;

namespace Horizon_Launcher.Controllers
{
    /// <summary>
    /// This class manages the initialization and shutdown of all controllers.
    /// The controllers' Init() and ShutDown() function should be called here if the controller is not going to be initialized later in the code.<br/>
    /// The following controllers are going to be booted later:<br/>
    /// </summary>
    public static class ControllerManager
    {
        public static string LogPrefix = "[" + nameof(ControllerManager) + "] ";

        /// <summary>
        /// Initializes all controllers of the application, which are registered in this function. If a critical error occurs, the application will be closed.
        /// </summary>
        public static void Init()
        {
            LogController.WriteLine(LogPrefix + "Starting the initialization of the controllers");

            InitController(nameof(LogController), LogController.Init(), LogController.ErrorMessage);

            CheckAndCreateFolders();

            InitController(nameof(ConfigController), ConfigController.Init(), ConfigController.ErrorMessage);
            InitController(nameof(API.HorizonWSController), API.HorizonWSController.Init(), API.HorizonWSController.ErrorMessage);

            LogController.WriteLine(LogPrefix + "Finished the initialization of the controllers");
        }

        private static void InitController(String ControllerName, Models.ControllerStatus status, String ErrorMessage)
        {
            LogController.WriteLine(LogPrefix + "Initialization status of " + ControllerName + ": " + status.ToString(), LogController.LogType.Debug);
            if (status == Models.ControllerStatus.OK)
                return;
            switch (status)
            {
                case Models.ControllerStatus.FatalErrorEM:
                    LogController.WriteLine(LogPrefix + "The initialization of the " + ControllerName + " failed due to a fatal error. The application will be closed soon. Controller Error:" + ErrorMessage, LogController.LogType.Error);
                    break;
                default:
                    LogController.WriteLine(LogPrefix + "The initialization of the " + ControllerName + " failed.", LogController.LogType.Warning);
                    break;
            }
        }

        private static void CheckAndCreateFolders()
        {
            if (Directory.Exists(AppInfo.DataFolder))
                return;

            try
            {
                Directory.CreateDirectory(AppInfo.DataFolder);
            }
            catch (Exception ex)
            {

            }
        }

        private static void ShutDownController(String ControllerName, Models.ControllerStatus status, String ErrorMessage)
        {
            LogController.WriteLine(LogPrefix + "Shutdown status of " + ControllerName + ": " + status.ToString(), LogController.LogType.Debug);
            if (status == Models.ControllerStatus.ShutDownOK)
                return;
            switch (status)
            {
                case Models.ControllerStatus.FatalErrorEM:
                    LogController.WriteLine(LogPrefix + "The shutdown of the " + ControllerName + " failed due to a fatal error. Controller Error:" + ErrorMessage, LogController.LogType.Error);
                    break;
                default:
                    LogController.WriteLine(LogPrefix + "The shutdown of the " + ControllerName + " failed.", LogController.LogType.Warning);
                    break;
            }
        }

        /// <summary>
        /// Shutdowns all controllers of the application, which are registered in this function.
        /// </summary>
        public static void ShutDown()
        {
            LogController.WriteLine(LogPrefix + "Starting the shutdown of the controllers");

            ShutDownController(nameof(ConfigController), ConfigController.ShutDown(), ConfigController.ErrorMessage);
            ShutDownController(nameof(LogController), LogController.ShutDown(), LogController.ErrorMessage);

            LogController.WriteLine(LogPrefix + "Finished the shutdown of the controllers");
        }
    }
}
