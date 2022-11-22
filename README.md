## Installation

### Through NPM
  - Unzip folder.
  - Get to the root folder of the application via CMD.
  - Run 'npm ci' in order to install all the dependencies according to the versions defined at 'package-lock.json' file.
    - Note: It might take a while to install all the packages.
  - Run 'npm run build' to build the application.
  - Run 'npm run start' to start the application.
  - On your browser, access the application launched at this address: http://localhost:3000.
  - Enjoy!

### Through Docker
  - Unzip folder.
  - Get to the root folder of the application via CMD.
  - Run 'docker build . -t ngcash' to build the docker image.
    - Note: It might take a while to build the image.
  - Run 'docker run -p 3000:3000 juliommen/ngcash' to run the container.
  - On your browser, access the application launched at this address: http://localhost:3000.
  - Enjoy!