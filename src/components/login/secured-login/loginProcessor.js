import { _ASSETS } from "./loginAssets.js";  // Login assets
import { _hash } from "./loginHasher.js";  // Login hasher
import { _conf } from "./zenguard-config.js";

// Fetch configuration from GitHub
async function fetchConfig() {
  /*
  try {
    const response = await fetch("https://raw.githubusercontent.com/zenxync/zenguard/main/public/zenguard-config-reactjs.json");
    if (!response.ok) throw new Error("Failed to fetch ZenGuard configuration.");
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
  */
  return true
}


class processor {
  //Necessary variable. Removing it will cause some critical errors.
  #hashedPassword;
  #engineVerified;



  //You can change this based on your needs.
  name;
  #password;

  //Don't forget to change the constructor also.
  constructor(name, password) {
    this.name = name;
    this.#password = password;
    this.#engineVerified = null;
  }

  //startEngine is the MAIN FUNCTION. 
  async startEngine() {
    const engineVerifying = await this.verifyEngine();

    if (engineVerifying?.isVerified) {
      this.#engineVerified = true;
      console.log("Process started.");
      console.log("Finding local-saved info..");

      //Attempting to find local-saved info.
      try {
        this.hash()
      } catch (error) {
        console.log("No local-saved info. Continuing to do non-autofetch protocol.");
        if (this.#engineVerified) {
          this.hash();
        } else {
          console.error("Local ZenGuard Engine is not verified.")
        }
      }

      if (this.#hashedPassword) {
        const doVerify = this.verify(); //Start info verification.
        return doVerify //Return the needed value.
      } else {
        return this.sendResponse("FAIL", "Incomplete required data.")
      }

    } else {
      this.#engineVerified = false
      console.error("Login process aborted.");
      console.warn(engineVerifying?.message);
    }
  }

  hash() {
    if (this.#password) {
      let slicedPassword = this.#password.split("");
      console.log("Starting hashing process..");
      for (let i = 0; i < slicedPassword.length; i++) {
        if (_hash[slicedPassword[i]]) {
          slicedPassword[i] = _hash[slicedPassword[i]];
        }
      }

      console.log("Hash success.");
      this.#hashedPassword = slicedPassword.join("");
      return this.sendResponse("OK", "Credentials hashed.")
    } else {
      return this.sendResponse("FAIL", "Password is unreadable.")
    }
  }

  verify() {
    try {
      if (this.#hashedPassword) {
        if (this.name in _ASSETS) {
          const userPassword = _ASSETS[this.name].credentials.password;
          if (this.#hashedPassword === userPassword) {
            console.info("Login success.");
            //You can save the login info to local storage by calling "this.saveInfo()"
            return this.sendResponse("OK", { name: this.name, password: this.#hashedPassword })

          } else {
            throw new Error("Password not match.");
          }
        } else {
          throw new Error("User is not in database.");
        }
      } else {
        throw new Error("Password is unreadable.");
      }
    } catch (err) {
      return this.sendResponse("FAIL", err.message)
    }
  }

  // "status" is where you put the success/fail indicator.
  // "object" is where you put information you want to provide or error message.
  sendResponse(status, object) {
    return { status: status, message: object }
  }


  saveInfo() {
    //Put the data you want to save locally.
    const toSave = JSON.stringify({
      name: this.name,
      password_hashed: this.#hashedPassword
    });

    try {
      //Save the information.
      localStorage.setItem("zencore-global-id", toSave); //You can change the localStorage variable name.
    } catch (error) {
      console.log(error);
      console.log("Info saving is failed. No data saved.");
    }
  }

  async verifyEngine() {
    /*try {
      const remoteConf = await fetchConfig();
      if (!remoteConf) throw new Error("Failed to fetch remote configuration.");

      if (_conf.version !== remoteConf.version) {
        throw new Error("Local ZenGuard version is invalid or outdated.");
      } else if (_conf.engine_version !== remoteConf.engine_version) {
        throw new Error("Local ZenGuard Engine version is invalid or outdated.");
      } else if (_conf.engine_context !== remoteConf.engine_context || _conf.name !== remoteConf.name) {
        throw new Error("Local Zenguard configuration cannot be verified.");
      }

      return { isVerified: true };
    } catch (err) {
      return { isVerified: false, message: err.message };
    }*/
    return { isVerified: true };
  }
}

export default processor;
