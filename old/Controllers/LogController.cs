using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace Horizon_Launcher.Controllers
{
    public static class LogController
    {
        //paths
        private static string LogFilePath;
        private static string LogFileFolderPath;

        private static StreamWriter StreamWriter;
        public static string ErrorMessage { get; private set; }
        public enum LogType
        {
            Info,
            Error,
            Warning,
            Debug,
        }

        private static bool InitDone = false;

        private static List<string> MessageQueue = new List<string>();
        private static Timer WriteNextMessageTimer;
        private static bool RestartTimer = true;

        public static Models.ControllerStatus Init()
        {
            if (!InitLogFolder())
                return Models.ControllerStatus.FatalErrorEM;

            if (!InitLogFile())
                return Models.ControllerStatus.FatalErrorEM;

            RestartTimer = true;

            WriteNextMessageTimer = new Timer(100);
            WriteNextMessageTimer.Elapsed += WriteNextMessageTimer_Elapsed;
            WriteNextMessageTimer.Start();

            InitDone = true;
            return Models.ControllerStatus.OK;
        }

        private static void WriteNextMessageTimer_Elapsed(object sender = null, ElapsedEventArgs e = null)
        {
            if (MessageQueue.Count < 1)
                return;
            WriteNextMessageTimer.Stop();
            List<string> MessageQueueDump = new List<string>(MessageQueue);
            MessageQueue.Clear();
            foreach (String message in MessageQueueDump.ToList())
            {
#if DEBUG
                Trace.Write(message);
#endif
                StreamWriter.Write(message);
                MessageQueueDump.Remove(message);
            }
            StreamWriter.Flush();

            if (!RestartTimer)
                return;
            WriteNextMessageTimer.Start();
        }

        private static bool InitLogFolder()
        {
            LogFileFolderPath = Path.Join(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), @"\Horizon Launcher\");
            if (!Directory.Exists(LogFileFolderPath))
            {
                try
                {
                    Directory.CreateDirectory(LogFileFolderPath);
                }
                catch (Exception ex)
                {
                    ErrorMessage = "The folder for the log files could not be created.\nError: " + ex.Message;
                    return false;
                }
            }
            else
            {
                // check for older log files and delete them if necessary
                DirectoryInfo info = new DirectoryInfo(LogFileFolderPath);
                FileInfo[] files = info.GetFiles().OrderBy(p => p.CreationTime).ToArray();
                if (files.Length > 30)
                {
                    int files_to_remove = files.Length - 30;
                    foreach (FileInfo file in files)
                    {
                        try
                        {
                            File.Delete(file.FullName);
                        }catch(Exception ex)
                        {

                        }
                        files_to_remove--;
                        if (files_to_remove <= 0)
                            break;
                    }
                }
            }

            return true;
        }

        private static bool InitLogFile()
        {
            LogFilePath = Path.Combine(LogFileFolderPath, DateTime.Now.ToString("yyyy-dd-M--HH-mm-ss") + ".log");
            try
            {
                StreamWriter = new StreamWriter(File.Create(LogFilePath));
            }
            catch (Exception ex)
            {
                ErrorMessage = "The log file could not be created.\nError: " + ex.Message;
                return false;
            }

            return true;
        }

        public static void WriteLine(string Message, LogType logType = LogType.Info)
        {
            string ltype = logType.ToString().ToUpper();
            string message = "[" + ltype + "]\t<" + DateTime.Now + "> " + Message + "\n";
            MessageQueue.Add(message);
        }

        public static Models.ControllerStatus ShutDown()
        {
            if (!InitDone)
                return Models.ControllerStatus.InitNotDone;

            WriteNextMessageTimer.Stop();
            RestartTimer = false;
            WriteNextMessageTimer_Elapsed();
            StreamWriter.Close();
            InitDone = false;

            return Models.ControllerStatus.ShutDownOK;
        }
    }
}
