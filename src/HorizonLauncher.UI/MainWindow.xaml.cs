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
using System.Windows.Threading;

namespace HorizonLauncher.UI
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            //pageContent.Content = new Pages.Login(this);
            pageContent.Content = new Pages.Home(this);
        }

        public void ShowLoadingOverlay()
        {
            this.Dispatcher.Invoke(DispatcherPriority.Normal,
                    new Action(() =>
                    {
                        LoadingOverlay.Visibility = Visibility.Visible;
                    }));
        }

        public void HideLoadingOverlay()
        {
            this.Dispatcher.Invoke(DispatcherPriority.Normal,
                    new Action(() =>
                    {
                        LoadingOverlay.Visibility = Visibility.Collapsed;
                    }));
        }
    }
}
