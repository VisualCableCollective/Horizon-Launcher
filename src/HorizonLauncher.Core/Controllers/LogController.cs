using NLog;
using System;
using System.Runtime.InteropServices;

namespace HorizonLauncher.Core.Controllers
{
    /// <summary>
    ///     Implementation of NLog.
    /// </summary>
    public class LogController : Controller
    {
        // Console Functions Import
        [DllImport("Kernel32")]
        private static extern void AllocConsole();

        [DllImport("Kernel32")]
        private static extern void FreeConsole();

        internal override void Initalize()
        {
            // We can't force VS to open a console anymore, so we have to manually open it here
            // DEBUG should only be defined in a dev environment so we can use it to make sure it only opens in a dev environment
#if DEBUG
            OpenConsoleWindow();
#endif

            var config = new NLog.Config.LoggingConfiguration();

            // Custom log message format
            String logMessageFormat = "[${longdate}][${level:uppercase=true}]${logger}: ${message} ${exception:format=toString,Data}";

            // Log targets
            var logfile = new NLog.Targets.FileTarget() { FileName = "HorizonLauncher.log", Layout = logMessageFormat };
            var logconsole = new NLog.Targets.OutputDebugStringTarget() { Layout = logMessageFormat }; // VS Debug Console
            var logconsole2 = new NLog.Targets.ColoredConsoleTarget() { Layout = logMessageFormat }; // Normal App Console

            // Rules for mapping loggers to targets            
            config.AddRule(LogLevel.Trace, LogLevel.Fatal, logconsole);
            config.AddRule(LogLevel.Trace, LogLevel.Fatal, logconsole2);
            config.AddRule(LogLevel.Trace, LogLevel.Fatal, logfile);

            // Apply config           
            LogManager.Configuration = config;

            // Set log time to UTC
            NLog.Time.TimeSource.Current = new NLog.Time.FastUtcTimeSource();

            InitDone = true;
        }

        internal override void ShutDown()
        {
            base.ShutDown();
            LogManager.Shutdown();
        }

        // Accessing imported console functions AllocConsole() and FreeConsole() directly is a violation of the CA1401 rule.
        public static void OpenConsoleWindow()
        {
            AllocConsole();
        }

        public static void CloseConsoleWindow()
        {
            FreeConsole();
        }
    }
}
