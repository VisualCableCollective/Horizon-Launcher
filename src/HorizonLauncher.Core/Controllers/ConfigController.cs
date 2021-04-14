using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HorizonLauncher.Core.Controllers
{
    public class ConfigController : Controller
    {
        private readonly NLog.Logger logger = NLog.LogManager.GetLogger("Config");
        public Models.Config.Config Config = null;

        internal override void Initalize()
        {
            LoadConfigFile();
            InitDone = true;
        }

        internal override void ShutDown()
        {
            base.ShutDown();
            SaveConfigFile();
            InitDone = false;
        }

        /// <summary>
        ///     Loads the configuration file. If it doesn't exist the configuration file will be automatically created.
        /// </summary>
        /// <returns>
        ///     <see langword="true"/> if the config was loaded successfully,
        ///     <see langword="false"/> if a new config couldn't be created or the config file couldn't be read.
        /// </returns>
        private bool LoadConfigFile()
        {
            if (File.Exists(Models.Paths.ConfigFilePath))
            {
                // attempt to load the config
                logger.Info("Config file found at " + Models.Paths.ConfigFilePath);
                String configFileContent;
                try
                {
                    configFileContent = File.ReadAllText(Models.Paths.ConfigFilePath);
                }catch(Exception ex)
                {
                    logger.Error(ex, "Couldn't read the content of the config file");
                    return false;
                }
                try
                {
                    Config = JsonConvert.DeserializeObject<Models.Config.Config>(configFileContent);
                }
                catch (Exception ex)
                {
                    logger.Warn(ex, "Couldn't convert the content of the config file. Creating a new config instead...");
                    CreateConfig();
                }
            }
            else
            {
                // create new config and config file
                logger.Info("No config file found. Creating new config file at " + Models.Paths.ConfigFilePath + "...");
                if (!CreateConfig())
                    return false;
            }
            return true;
        }

        /// <summary>
        ///     Creates a new default config and saves it.
        /// </summary>
        /// <returns>
        ///     Result of <see cref="SaveConfigFile"/>: <br/>
        ///     <inheritdoc cref="SaveConfigFile"/>
        /// </returns>
        private bool CreateConfig()
        {
            Config = new Models.Config.Config();
            return SaveConfigFile();
        }

        /// <summary>
        ///     Converts <see cref="Models.Config.Config"/> to JSON and writes it into the config file.
        /// </summary>
        /// <returns>
        ///     <see langword="true"/> if the config was saved successfully,
        ///     <see langword="false"/> if the config couldn't be saved or the config is empty.
        /// </returns>
        private bool SaveConfigFile()
        {
            if (Config == null)
                return false;

            var configJSON = JsonConvert.SerializeObject(Config);

            try
            {
                File.WriteAllText(Models.Paths.ConfigFilePath, configJSON);
            }catch(Exception ex)
            {
                logger.Warn(ex, "Failed to save the config.");
                return false;
            }
            return true;
        }
    }
}
