# Glade

Glade is a hyper-extensible personal dashboard.

<img width="1816" height="902" alt="image" src="https://github.com/user-attachments/assets/dc26bcba-8194-46b7-96d0-07db2df882c4" />

The image above shows an example widget which renders only plaintext, and a more complex widget which makes a weather API call. Creating a new widget is as simple as defining the metadata and component in the frontend, and the API endpoint in the backend. All widgets are automatically discovered, to minimise any interactions with the skeleton backing this system.

## What does this mean for me?

All of your cool projects tucked behind a command line and lost in your file system can be very easily connected up to this system with minimal boilerplate, which automatically gives it a prominent and visually aesthetic place to live. This means that any source of information you could ever need can be wired in by simply defining how it should be rendered on the frontend, and how to compute it in the backend.

A sample weather widget has been created, which simply calls a weather API and returns the data, rendering it on the front-end. Future widgets planned include email summarisers, calendar organisers, GitHub Radar to show open PRs to be reviewed, failing CI jobs, etc. This system can organise every single administrative aspect into one dashboard with little hassle.

To this end, CI/CD will be extremely important. New branches will be created for widgets and when merged, should be immediately deployed to whatever is hosting the dashboard.

## Tech and Architecture Highlights
- A modern frontend using Next.js, React and Typescript, Tailwind with JIT, PostCSS, ESLint and dynamic widget discovery
- A robust backend with Python and FastAPI
- Asynchronous services using httpx
- Containerized CI/CD using multi-stage Dockerfiles for both the frontend and backend, ready for GitHub Actions integration
