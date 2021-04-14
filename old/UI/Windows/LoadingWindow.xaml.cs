using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Horizon_Launcher.UI.Windows
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class LoadingWindow : Window
    {
        private App App;
        public LoadingWindow(App _app)
        {
            App = _app;
            InitializeComponent();
        }

        private void Window_ContentRendered(object sender, EventArgs e)
        {
            Task.Run(() =>
            {
                Controllers.ControllerManager.Init();
                App.LaunchMainWindow();
            });
        }
    }
}
