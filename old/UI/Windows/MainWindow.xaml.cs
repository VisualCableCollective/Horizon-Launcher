﻿using System;
using System.Collections.Generic;
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
using System.Windows.Shapes;

namespace Horizon_Launcher.UI.Windows
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Timer TopBarMouseClickTimer;
        private Brush WindowCloseButtonHoverBrush = null;
        private Brush ChangeWindowSizeBtnHoverBrush = null;
        private double NormalWindowHeight = 0;
        private double NormalWindowWidth = 0;
        private FriendsWindow _FriendsWindow = null;
        private double NavItemMouseEnterOpacity = 1;
        private double NavItemMouseLeaveOpacity = 0.6;
        private Models.NavigationItems SelectedNavigationItem = Models.NavigationItems.Home;
        public MainWindow()
        {
            InitializeComponent();

            //Visually mark the selected NavItem as active
            Label navItemLabel = (Label)((Border)this.FindName("NavItem" + SelectedNavigationItem)).Child;
            navItemLabel.Opacity = NavItemMouseEnterOpacity;
            Image navItemImage = (Image)((Border)this.FindName("NavItem" + SelectedNavigationItem + "Icon")).Child;
            navItemImage.Opacity = NavItemMouseEnterOpacity;

            //convert Brushes
            BrushConverter brushConverter = new BrushConverter();
            WindowCloseButtonHoverBrush = (Brush)brushConverter.ConvertFromString("#FFD12121");
            ChangeWindowSizeBtnHoverBrush = (Brush)brushConverter.ConvertFromString("#095db8");

            TopBarMouseClickTimer = new Timer(500);
            TopBarMouseClickTimer.Elapsed += new ElapsedEventHandler(TopBarMouseClickTimerEvent);

            NormalWindowHeight = this.ActualHeight;
            NormalWindowWidth = this.ActualWidth;
        }

        private void Close_Btn_Clicked(object sender, MouseButtonEventArgs e)
        {
            this.Close();
        }

        private void TopBar_MouseDown(object sender, MouseButtonEventArgs e)
        {
            //dragging the window
            if (e.ChangedButton == MouseButton.Left)
            {
                this.DragMove();
            }
            if (TopBarMouseClickTimer.Enabled)
            {
                if (this.Height != SystemParameters.FullPrimaryScreenHeight || this.Width != SystemParameters.FullPrimaryScreenWidth)
                {
                    NormalWindowHeight = this.ActualHeight;
                    NormalWindowWidth = this.ActualWidth;
                    this.Left = 0;
                    this.Top = 0;
                    this.Height = SystemParameters.FullPrimaryScreenHeight;
                    this.Width = SystemParameters.FullPrimaryScreenWidth;
                }
                else
                {
                    this.Height = NormalWindowHeight;
                    this.Width = NormalWindowWidth;
                }
                TopBarMouseClickTimer.Stop();
            }
            else
                TopBarMouseClickTimer.Start();

        }

        private void TopBarMouseClickTimerEvent(object sender, ElapsedEventArgs e)
        {
            TopBarMouseClickTimer.Stop();
        }
        private void ChangeWindowSizeBtn_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (this.WindowState == WindowState.Maximized)
                this.WindowState = WindowState.Normal;
            else
                this.WindowState = WindowState.Maximized;
        }

        private void WindowCloseButton_MouseEnter(object sender, MouseEventArgs e)
        {
            WindowCloseButton.Background = WindowCloseButtonHoverBrush;
        }

        private void WindowCloseButton_MouseLeave(object sender, MouseEventArgs e)
        {
            WindowCloseButton.Background = Brushes.Black;
        }

        private void ChangeWindowSizeBtn_MouseEnter(object sender, MouseEventArgs e)
        {
            ChangeWindowSizeBtn.Background = ChangeWindowSizeBtnHoverBrush;
        }

        private void ChangeWindowSizeBtn_MouseLeave(object sender, MouseEventArgs e)
        {
            ChangeWindowSizeBtn.Background = Brushes.Black;
        }

        private void Friends_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (_FriendsWindow != null)
            {
                _FriendsWindow.Focus();
                return;
            }
            _FriendsWindow = new FriendsWindow();
            _FriendsWindow.Closed += FriendsWindow_Closed;
            _FriendsWindow.Show();
        }

        private void FriendsWindow_Closed(object sender, EventArgs e)
        {
            _FriendsWindow = null;
        }

        private void NavItem_MouseEnter(object sender, MouseEventArgs e)
        {
            this.Dispatcher.Invoke(() =>
            {
                Border border = (Border)sender;
                String navItemName = border.Name.Replace("Icon", "");
                if (navItemName.Replace("NavItem", "") == SelectedNavigationItem.ToString())
                    return;

                Label navItemLabel = (Label)((Border)this.FindName(navItemName)).Child;
                navItemLabel.Opacity = NavItemMouseEnterOpacity;
                Image navItemImage = (Image)((Border)this.FindName(navItemName + "Icon")).Child;
                navItemImage.Opacity = NavItemMouseEnterOpacity;
            });
        }

        private void NavItem_MouseLeave(object sender, MouseEventArgs e)
        {
            this.Dispatcher.Invoke(() =>
            {
                Border border = (Border)sender;
                String navItemName = border.Name.Replace("Icon", "");
                if (navItemName.Replace("NavItem", "") == SelectedNavigationItem.ToString())
                    return;
                Label navItemLabel = (Label)((Border)this.FindName(navItemName)).Child;
                navItemLabel.Opacity = NavItemMouseLeaveOpacity;
                Image navItemImage = (Image)((Border)this.FindName(navItemName + "Icon")).Child;
                navItemImage.Opacity = NavItemMouseLeaveOpacity;
            });
        }
    }
}