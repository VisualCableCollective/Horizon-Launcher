using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HorizonLauncher.Core.Controllers
{
    public class Controller
    {
        protected bool InitDone = false;
        internal virtual void Initalize()
        {
            InitDone = true;
        }
        internal virtual void ShutDown()
        {
            if (!InitDone)
                return;
        }
    }
}
