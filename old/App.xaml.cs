using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace Horizon_Launcher
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private UI.Windows.LoadingWindow _LoadingWindow;
        private UI.Windows.MainWindow _MainWindow;
        void App_Startup(object sender, StartupEventArgs e)
        {
            FrameworkElement.StyleProperty.OverrideMetadata(typeof(Window), new FrameworkPropertyMetadata
            {
                DefaultValue = FindResource(typeof(Window))
            });

            _LoadingWindow = new UI.Windows.LoadingWindow(this);
            _LoadingWindow.Show();
            MainWindow = _LoadingWindow;
        }

        public void LaunchMainWindow()
        {
            this.Dispatcher.Invoke(() =>
            {
                _MainWindow = new UI.Windows.MainWindow();
                _MainWindow.Show();
                MainWindow = _MainWindow;

                _LoadingWindow.Close();
                _LoadingWindow = null;
            });
        }

        private void Application_Exit(object sender, ExitEventArgs e)
        {
            Controllers.ControllerManager.ShutDown();
        }
    }
}
