using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PusherClient;

namespace Horizon_Launcher.Controllers.API
{
    public static class HorizonWSController
    {
        /// <summary>
        /// Indicates whether the controller was successfully initialized.
        /// </summary>
        private static bool InitDone = false;

        private static String LogPrefix = "[" + nameof(HorizonWSController) + "] ";
        public static string ErrorMessage { get; private set; }

        private static Pusher Client = null;

        /// <summary>
        /// Initializes the controller. Usually called by the MainController.
        /// </summary>
        /// <returns>Controller Initialization Status</returns>
        public static Models.ControllerStatus Init()
        {
            Client = new Pusher(AppInfo.HorizonAPI_WSAppKey, new PusherOptions()
            {
                Host = AppInfo.HorizonAPI_WSHost,
                Authorizer = new HttpAuthorizer(AppInfo.HorizonAPI_WSAuthEndpointURL, ConfigController.ConfigData.AuthorizationKey)
            });

            Client.ConnectionStateChanged += Client_ConnectionStateChanged;
            Client.Connected += Client_Connected;
            Client.Disconnected += Client_Disconnected;
            Client.Error += Client_Error;

            Client.ConnectAsync();

            InitDone = true;

            return Models.ControllerStatus.OK;
        }

        #region WebSocket Client Events

        private static void Client_Connected(object sender)
        {
            LogController.WriteLine(LogPrefix + "Connected");
        }

        private static void Client_ConnectionStateChanged(object sender, ConnectionState state)
        {
            LogController.WriteLine(LogPrefix + "Connection state changed to " + state.ToString());
        }

        private static void Client_Disconnected(object sender)
        {
            LogController.WriteLine(LogPrefix + "Disconnected");
        }

        private static void Client_Error(object sender, PusherException error)
        {
            LogController.WriteLine(LogPrefix + "An error (PusherCode: " + error.PusherCode.ToString() + ") occured. Message: " + error.Message, LogController.LogType.Error);
        }

        #endregion

        /// <summary>
        /// Shutdowns the controller. Usually called by the MainController.
        /// </summary>
        /// <returns>Controller Shutdown Status</returns>
        public static Models.ControllerStatus ShutDown()
        {
            if (!InitDone)
                return Models.ControllerStatus.InitNotDone;

            //wait for the operation to finish so we make sure that we are actually disconnected before disposing the client object
            _ = Client.DisconnectAsync().Result;

            Client = null;

            return Models.ControllerStatus.ShutDownOK;
        }
    }
}
