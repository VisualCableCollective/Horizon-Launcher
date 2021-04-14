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
using Horizon_Launcher.UI.Components;

namespace Horizon_Launcher.UI.Pages
{
    /// <summary>
    /// Interaktionslogik für Store.xaml
    /// </summary>
    public partial class Store : UserControl
    {
        public List<ImageSlideShow.ImagePost> ImagePostsList { get; set; }
        public Store()
        {
            //test
            List<ImageSlideShow.ImagePost> ipl = new List<ImageSlideShow.ImagePost>();
            ipl.Add(new ImageSlideShow.ImagePost("Custom Dev Test", (ImageSource)new ImageSourceConverter().ConvertFromString("pack://application:,,,/Resources/Images/Backgrounds/LoadingWindow.png"), "Test Button Text"));
            ipl.Add(new ImageSlideShow.ImagePost("Custom Dev Test2", (ImageSource)new ImageSourceConverter().ConvertFromString("pack://application:,,,/Resources/Images/Backgrounds/LoadingWindow.png"), "Test Button Text2"));

            InitializeComponent();

            ImageSlideShow imageSlideShow = new ImageSlideShow(ipl);
            Container.Children.Add(imageSlideShow);

            this.DataContext = this;
        }
    }
}
