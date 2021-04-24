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
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.Shapes;

namespace HorizonLauncher.UI.Pages
{
    /// <summary>
    /// Interaktionslogik für Home.xaml
    /// </summary>
    public partial class Home : Page
    {
        public Home(MainWindow mainWindow)
        {
            var img = SixLabors.ImageSharp.Image.Load("Ressources/UI/Placeholder/AppBannerPlaceholder.png");

            SixLabors.ImageSharp.Image dest = img.Clone(x => x.Saturate(0));

            dest.Save("cacheimg.png");

            InitializeComponent();
            Banner.Source = (ImageSource)new ImageSourceConverter().ConvertFromString("cacheimg.png");
            mainWindow.HideLoadingOverlay();
        }
    }
}
