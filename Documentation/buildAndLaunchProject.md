# buildAndLaunchProject.sh  
This is a simple script that cleans, builds, and starts the server for our project.  

## How To Use  
1. `cd` into the **main** project directory.
 In our case that is `digital-display-garden-iteration-2-omaranwar`  
2. `chmod +x buildAndLaunchProject.sh` This makes the file executable.
3. `./buildAndLaunchProject.sh`
4. Hurray 🎉🎉🎉  

## What It Does  
1. cleans gradle (`./gradlew clean`)
2. builds gradle (`./gradlew build`)
3. moves a tarball to home, unzips the tarball, and runs the srever!
