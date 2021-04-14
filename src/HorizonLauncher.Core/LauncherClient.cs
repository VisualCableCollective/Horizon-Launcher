using System;
using System.IO;
using HorizonLauncher.Core.Controllers;
using HorizonLauncher.Modules.HorizonAPIClient;

namespace HorizonLauncher.Core
{
    /// <summary>
    ///     Represents a Horizon Launcher client to interact with the core and its modules.
    /// </summary>
    public static class LauncherClient
    {
        private static NLog.Logger logger;

#pragma warning disable CA2211
        public static LogController LogController;
        public static ConfigController ConfigController;
        public static HorizonAPIClient HorizonAPIClient;
#pragma warning restore CA2211
        public static void Initalize()
        {
            InitalizeControllers();
        }

        public static void ShutDown()
        {
            ShutDownControllers();
        }

        private static void InitalizeControllers()
        {
            LogController = new LogController();
            LogController.Initalize();

            logger = NLog.LogManager.GetLogger("LauncherClient");

            CreateRequiredDirectories();

            ConfigController = new ConfigController();
            InitalizeController(ConfigController);

            InitalizeHorizonAPIClient();
        }

        private static void InitalizeController(Controller controller)
        {
            logger.Trace("Initalizing " + controller.GetType().Name + "...");
            controller.Initalize();
            logger.Trace("Initalized " + controller.GetType().Name + ".");
        }

        private static void InitalizeHorizonAPIClient()
        {
            logger.Trace("Initalizing HorizonAPIClient...");
            HorizonAPIClientConfig config = new();
            config.HTTPUserAgent = "Horizon Desktop Client v1.0.0 DevAlpha";
            if (!String.IsNullOrWhiteSpace(ConfigController.Config.HorizonAuthToken))
            {
                logger.Info("Found Horizon auth token in the config.");
                config.AuthorizationToken = ConfigController.Config.HorizonAuthToken;
            }
            else
            {
                logger.Info("No Horizon auth token found in the config.");
            }

            HorizonAPIClient = new(config);

            logger.Trace("Initalized HorizonAPIClient...");
        }

        private static void ShutDownControllers()
        {
            ShutDownController(ConfigController);

            LogController.ShutDown();
        }

        private static void ShutDownController(Controller controller)
        {
            logger.Trace("Shutting down " + controller.GetType().Name + "...");
            controller.ShutDown();
            logger.Trace("Finished shutting down " + controller.GetType().Name + ".");
        }

        /// <summary>
        ///     Checks if the required directories exist and creates them if needed.
        /// </summary>
        /// <returns><see langword="true"/> if operation was successful, <see langword="false"/> if operation failed.</returns>
        private static bool CreateRequiredDirectories()
        {
            if (!Directory.Exists(Models.Paths.AppData))
            {
                logger.Info("AppData directory doesn't exist. Creating it...");
                try
                {
                    Directory.CreateDirectory(Models.Paths.AppData);
                }catch (Exception ex)
                {
                    logger.Error(ex, "Failed to create the AppData directory.");
                    return false;
                }
            }
            return true;
        }
    }
}
