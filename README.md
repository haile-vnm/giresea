# Giresea

An application that helps users search and list all public React repositories on GitHub.

## Project Structure

```
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── ...
│   │   └── ...
│   ├── integrations
│   │   ├── github
│   │   │   ├── types
│   │   │   ├── server.ts
│   │   │   └── ...
│   │   └── ...
│   ├── lib
│   │   ├── constant.ts
│   │   ├── localstorage.ts
│   │   └── ...
│   ├── pages
│   │   ├── ...
│   │   └── ...
│   ├── App.ts
│   ├── index.ts
│   └── ...
├── .gitignore
├── package.json
├── Dockerfile
├── ...
└── README.md
```

- `public`: This folder contains the public assets of this project, including the `index.html` file, which is the entry point of this application.
- `src`: This folder contains the source code of this project.
  - `components`: This folder contains reusable components used throughout this application.
  - `integrations`: This folder contains service modules responsible for interacting with external services or APIs.
    - `github`: This folder contains all the logic related to the GitHub service.
      - `types`: This folder contains resource models related to the GitHub service.
      - `server.ts`: This file contains the general instance that is used by all other files in this folder.
  - `lib`: This folder contains reusable functions and objects used throughout this application.
  - `pages`: This folder contains the individual pages or views of this application.
  - `App.ts`: The root component that defines the overall structure of this application and handles routing.
  - `index.ts`: The entry point of this application that renders the root component and mounts it to the DOM.

## Installation

### Clone the GitHub repository

```shell
git clone git@github.com:haile-vnm/giresea.git
```

### Go to the project folder

Navigate to the `giresea` folder created by the previous command.

```shell
cd giresea
```

### Build the Docker image

```shell
docker build -t giresea .
```

### Run the Docker container

```shell
docker run -v ${PWD}:/app -p 3000:3000 -i giresea
```

## Test the app 🚀

After successfully building the services mentioned above, you can access the app via [`http://localhost:3000`](http://localhost:3000).

Then, enjoy every small moment!! 💃🕺

Thank you! 🥳🥳🥳
