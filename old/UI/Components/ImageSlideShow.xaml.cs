using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
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

namespace Horizon_Launcher.UI.Components
{
    /// <summary>
    /// ImageSlideShow creates a slideshow containing <see cref="ImagePost"/>
    /// </summary>
    public partial class ImageSlideShow : UserControl
    {

        public struct ImagePost
        {
            /// <summary>
            /// The title will be displayed over the button on the left side of the current visible <see cref="ImagePost"/> in the <see cref="ImageSlideShow"/>. <br></br>If <see cref="Title"/> is empty, no title will be displayed on the current <see cref="ImagePost"/>
            /// </summary>
            public readonly String Title;

            /// <summary>
            /// Sets the text in the button below the title. If the <see cref="ButtonText"/> is empty, no button will be displayed on the current <see cref="ImagePost"/>
            /// </summary>
            public readonly String ButtonText;

            /// <summary>
            /// Sets the background image of the <see cref="ImagePost"/>
            /// </summary>
            public readonly ImageSource BackgroundImageSource;

            /// <summary>
            /// Sets the logo image of the <see cref="ImagePost"/>, which will be displayed above the <see cref="Title"/>
            /// </summary>
            public readonly ImageSource LogoImageSource; 
            public ImagePost(String _title, ImageSource _backgroundimageSource, String _buttonText = null, ImageSource _logoImageSource = null)
            {
                Title = _title;
                ButtonText = _buttonText;
                BackgroundImageSource = _backgroundimageSource;
                LogoImageSource = _logoImageSource;
            }
        }

        public ImageSlideShowData Data;

        private Timer NextImagePostTimer;

        public ImageSlideShow(List <ImagePost> list = null)
        {
            Data = new ImageSlideShowData
            {
                ImagePostsList = list
            };

            InitializeComponent();
            this.DataContext = Data;

            if (Data.ImagePostsList != null)
            {
                InitBottomNavigaitionBar();
                InitSlideShow();
            }
        }

        /// <summary>
        /// Initializes and starts the slideshow 
        /// </summary>
        private void InitSlideShow()
        {
            // set first imagepost
            ImagePost imagePost = Data.ImagePostsList.First();
            Data.CurrentPostBGImageSource = imagePost.BackgroundImageSource;
            Data.CurrentPostLogoImageSource = imagePost.LogoImageSource;
            Data.CurrentPostButtonText = imagePost.ButtonText;
            Data.CurrentPostTitle = imagePost.Title;

            //init timer
            if(Data.ImagePostsList.Count > 0)
            {
                NextImagePostTimer = new Timer(3000);
                NextImagePostTimer.Elapsed += NextImagePostTimer_Elapsed;
                NextImagePostTimer.Start();
            }
        }

        private void NextImagePostTimer_Elapsed(object sender, ElapsedEventArgs e)
        {
            this.Dispatcher.Invoke(DispatcherPriority.Normal,
                new Action(() =>
                {
                    SetNewPost(Data.CurrentPostID + 1);
                }));
        }

        /// <summary>
        /// Checks if the selected BottomNavigationElement represents the current visible psot
        /// </summary>
        /// <param name="name">Name of the selected BottomNavigationElement</param>
        /// <returns><see langword="true"/> if the id of the BottomNavigationElement is equal to <see cref="ImageSlideShowData.CurrentPostID"/></returns>
        private bool IsSelectedPostVisible(String name)
        {
            int current_id = GetPostIDFromBottomNavigationElement(name);
            if(current_id == Data.CurrentPostID)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// Returns the PostID of a BottomNavigationElement
        /// </summary>
        /// <param name="name">Name of the BottomNavigationElement</param>
        /// <returns><see cref="int"/> post ID of the BottomNavigationElement</returns>
        private int GetPostIDFromBottomNavigationElement(String name)
        {
            name = name.Replace("BottomNavigationElement", "");
            return int.Parse(name);
        }

        private void Bottom_Navigation_Element_MouseEnter(object sender, MouseEventArgs e)
        {
            Rectangle rectangle = (Rectangle)sender;
            if(!IsSelectedPostVisible(rectangle.Name))
                rectangle.Opacity = 1;
        }

        private void Bottom_Navigation_Element_MouseLeave(object sender, MouseEventArgs e)
        {
            Rectangle rectangle = (Rectangle)sender;
            if (!IsSelectedPostVisible(rectangle.Name))
                rectangle.Opacity = 0.4;

        }

        private void SetNewPost(int PostID)
        {
            if(PostID >= Data.ImagePostsList.Count)
            {
                PostID = 0;
            }
            Rectangle rect = (Rectangle)BottomNavigationBar.FindName("BottomNavigationElement" + Data.CurrentPostID);
            rect.Opacity = 0.4;

            ImagePost ip = Data.ImagePostsList[PostID];
            Data.CurrentPostTitle = ip.Title;
            Data.CurrentPostButtonText = ip.ButtonText;
            Data.CurrentPostLogoImageSource = ip.LogoImageSource;
            Data.CurrentPostBGImageSource = ip.BackgroundImageSource;
            Data.CurrentPostID = PostID;

            Rectangle rect2 = (Rectangle)BottomNavigationBar.FindName("BottomNavigationElement" + PostID);
            rect2.Opacity = 1;
        }

        private void InitBottomNavigaitionBar()
        {
            for (int i = 1; i < Data.ImagePostsList.Count; i++)
            {
                CreateNewBottomNavigationBarElement(i);
            }
        }

        private void Bottom_Navigation_Element_MouseDown(object sender, MouseButtonEventArgs e)
        {
            Rectangle rectangle = (Rectangle)sender;
            if (IsSelectedPostVisible(rectangle.Name))
                return;
            int id = GetPostIDFromBottomNavigationElement(rectangle.Name);
            SetNewPost(id);
        }

        private void CreateNewBottomNavigationBarElement(int id)
        {
            Rectangle rectangle = new Rectangle
            {
                Fill = Brushes.White,
                Height = 3,
                Width = 35,
                Cursor = Cursors.Hand,
                Opacity = 0.4,
            };
            rectangle.MouseEnter += Bottom_Navigation_Element_MouseEnter;
            rectangle.MouseLeave += Bottom_Navigation_Element_MouseLeave;
            rectangle.MouseDown += Bottom_Navigation_Element_MouseDown;
            rectangle.Name = "BottomNavigationElement" + id;

            Thickness margin = rectangle.Margin;
            margin.Left = 5;
            margin.Right = 5;
            rectangle.Margin = margin;

            BottomNavigationBar.RegisterName("BottomNavigationElement" + id, rectangle);
            BottomNavigationBar.Children.Add(rectangle);
        }
    }

    public class ImageSlideShowData : INotifyPropertyChanged
    {
        #region Functions for notificating
        public event PropertyChangedEventHandler PropertyChanged;
        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChangedEventHandler handler = PropertyChanged;
            if (handler != null) handler(this, new PropertyChangedEventArgs(propertyName));
        }
        protected bool SetField<T>(ref T field, T value, string propertyName)
        {
            if (EqualityComparer<T>.Default.Equals(field, value)) return false;
            field = value;
            OnPropertyChanged(propertyName);
            return true;
        }
        #endregion


        #region Props
        public List<ImageSlideShow.ImagePost> ImagePostsList;
        public int CurrentPostID = 0;

        public ImageSource CurrentPostBGImageSource
        {
            get { return _CurrentPostBGImageSource; }
            set
            {
                SetField(ref _CurrentPostBGImageSource, value, nameof(CurrentPostBGImageSource));
            }
        }
        private ImageSource _CurrentPostBGImageSource;
        public ImageSource CurrentPostLogoImageSource
        {
            get { return _CurrentPostLogoImageSource; }
            set
            {
                SetField(ref _CurrentPostLogoImageSource, value, nameof(CurrentPostLogoImageSource));
            }
        }
        private ImageSource _CurrentPostLogoImageSource;
        public String CurrentPostTitle
        {
            get { return _CurrentPostTitle; }
            set
            {
                SetField(ref _CurrentPostTitle, value, nameof(CurrentPostTitle));
            }
        }
        private String _CurrentPostTitle;
        public String CurrentPostButtonText
        {
            get { return _CurrentPostButtonText; }
            set
            {
                SetField(ref _CurrentPostButtonText, value, nameof(CurrentPostButtonText));
            }
        }
        private String _CurrentPostButtonText;
        #endregion
    }
}
