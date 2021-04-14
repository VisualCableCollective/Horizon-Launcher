using CefSharp;
using CefSharp.Wpf;
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
using HorizonLauncher.Core;

namespace HorizonLauncher.UI.Pages
{
    /// <summary>
    /// Interaktionslogik für Login.xaml
    /// </summary>
    public partial class Login : Page
    {
        private static NLog.Logger logger = NLog.LogManager.GetLogger("LoginUI");

        private MainWindow mainWindow;

        private string loginURL = "http://localhost:8000/auth/vcc/web-app/redirect";

        public Login(MainWindow mainWindow)
        {
            this.mainWindow = mainWindow;

            CefSettings settings = new()
            {
                UserAgent = "Horizon Desktop Client v1.0.0 Dev Alpha"
            };
            Cef.Initialize(settings);

            InitializeComponent();
            loginWebBrowser.IsBrowserInitializedChanged += LoginWebBrowser_IsBrowserInitializedChanged;
        }

        private void LoginWebBrowser_IsBrowserInitializedChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            if (!loginWebBrowser.IsBrowserInitialized)
                return;
            loginWebBrowser.FrameLoadEnd += LoginWebBrowser_FrameLoadEnd;
            loginWebBrowser.AddressChanged += LoginWebBrowser_AddressChanged;
            loginWebBrowser.Address = loginURL;
        }

        private void LoginWebBrowser_FrameLoadEnd(object sender, FrameLoadEndEventArgs e)
        {
            if (e.Url.StartsWith("http://localhost:8000/auth/vcc/web-app/callback") && e.Frame.IsMain)
            {
                // we got the token
                e.Frame.GetTextAsync().ContinueWith(taskHtml =>
                {
                    logger.Debug("Received auth token response: " + taskHtml.Result);
                    try
                    {
                        LauncherClient.HorizonAPIClient.SetAuthTokenFromAuthTokenResponse(taskHtml.Result);
                    }catch(Exception ex)
                    {
                        logger.Error(ex, "Error while processing the auth token data: ");
                        MessageBox.Show("There was an issue processing signing in. We are now retrying it...", "Error: Login", MessageBoxButton.OK, MessageBoxImage.Exclamation);
                        this.Dispatcher.Invoke(DispatcherPriority.Normal,
                            new Action(() =>
                            {
                                loginWebBrowser.GetBrowser().StopLoad();
                                loginWebBrowser.GetBrowser().MainFrame.LoadUrl(loginURL);
                            }));
                        return;
                    }

                    // save auth token in the config
                    LauncherClient.ConfigController.Config.HorizonAuthToken = LauncherClient.HorizonAPIClient.Config.AuthorizationToken;

                    //ToDo: Get important user data and load the application home page

                });
            }else if (e.Url.StartsWith("https://vcc-online.eu/oauth/authorize") && e.Frame.IsMain)
            {
                // here comes the authorize screen for the dev OAuth clients
                // in prod we would get an error
                mainWindow.HideLoadingOverlay();
            }else if (e.Url.StartsWith("https://vcc-online.eu/login") || e.Url.StartsWith("https://vcc-online.eu/two-factor-challenge"))
            {
                mainWindow.HideLoadingOverlay();
            }
        }

        private void LoginWebBrowser_AddressChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            logger.Trace("Browser address changed from " + e.OldValue + " to " + e.NewValue);
            if (e.NewValue.ToString().StartsWith(loginURL) || e.NewValue.ToString().StartsWith("http://localhost:8000/auth/vcc/web-app/callback"))
            {
                mainWindow.ShowLoadingOverlay();
            }
            else if (e.NewValue.ToString().StartsWith("https://vcc-online.eu/register"))
            {
                mainWindow.ShowLoadingOverlay();
                this.Dispatcher.Invoke(DispatcherPriority.Normal,
                new Action(() =>
                {
                    loginWebBrowser.GetBrowser().StopLoad();
                    loginWebBrowser.GetBrowser().MainFrame.LoadUrl(loginURL);
                }));
                MessageBox.Show("Please create a new VCC account on the official VCC website in your webbrowser: https://vcc-online.eu/register ", "Warning: Can't register a new account in the client", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
            else if (e.NewValue.ToString().StartsWith("https://vcc-online.eu/forgot-password"))
            {
                mainWindow.ShowLoadingOverlay();
                this.Dispatcher.Invoke(DispatcherPriority.Normal,
                new Action(() =>
                {
                    loginWebBrowser.GetBrowser().StopLoad();
                    loginWebBrowser.GetBrowser().MainFrame.LoadUrl(loginURL);
                }));
                MessageBox.Show("Please reset your password on the official VCC website in your webbrowser: https://vcc-online.eu/forgot-password ", "Warning: Can't reset password in the client", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
            else if (e.NewValue.ToString().StartsWith("https://vcc-online.eu/login") || e.NewValue.ToString().StartsWith("https://vcc-online.eu/two-factor-challenge"))
            {
                // do nothing
                // LoadingOverlay will be hidden after the frame has been loaded
            }else if (e.NewValue.ToString().StartsWith("https://vcc-online.eu/oauth/authorize"))
            {
                mainWindow.HideLoadingOverlay();
            }
            else
            {
                mainWindow.ShowLoadingOverlay();
                this.Dispatcher.Invoke(DispatcherPriority.Normal,
                new Action(() =>
                {
                    loginWebBrowser.GetBrowser().StopLoad();
                    loginWebBrowser.GetBrowser().MainFrame.LoadUrl(loginURL);
                }));
            }
        }
    }
}
