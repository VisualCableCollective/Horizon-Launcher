using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Horizon_Launcher.Models
{
    /// <summary>
    /// The ControllerStatus represents the status of the respective controller after executing the <c>Init()</c> or <c>ShutDown()</c> function.
    /// </summary>
    public enum ControllerStatus
    {
        ///<summary>The controller has been successfully initialized and is working.</summary>
        OK,

        ///<summary>A fatal error has occurred that could limit the application's normal operation and therefore the application will be closed.</summary>
        FatalError,

        /// <summary>
        /// Is returned in the <c>ShutDown()</c> function if the initialization of the controller has failed or has not yet been finished.
        /// </summary>
        InitNotDone,

        /// <summary>
        /// <inheritdoc cref="ControllerStatus.FatalError"/>.<br/>
        /// Additional information about the error is available in the <see cref="String"/> <c>ErrorMessage</c> of the respective controller.
        /// </summary>
        FatalErrorEM,

        /// <summary>
        /// The controller was successfully de-initialized and shut down.
        /// </summary>
        ShutDownOK,
    }

    public enum NavigationItems
    {
        Home,
        Library,
        Friends,
        Download,
        Settings,
    }
}
