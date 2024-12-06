<!-- Improved compatibility of back to top link: See: https://github.com/SedatUygur/YouTube-Mate/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">YouTubeMate</h3>

  <p align="center">
    YouTube Mate is an app allow users to create and share YouTube watchlists
    <br />
    <a href="https://github.com/SedatUygur/YouTube-Mate"><strong>Explore the docs</strong></a>
    <br />
    <br />
    <a href="https://github.com/SedatUygur/YouTube-Mate/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/SedatUygur/YouTube-Mate/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

YouTubeMate is a full stack project will allow users to create & edit watch lists of YouTube channels. You can also watch videos of your favourite channels.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![TypeScript][TypeScript-logo]][TypeScript]
[![Svelte][Svelte-logo]][Svelte]
[![JavaScript][JavaScript-logo]][JavaScript]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Install a package manager e.g npm, yarn, pnpm, bun etc.

### Installation

1. Download or clone my repository
   ```sh
   git clone https://github.com/SedatUygur/YouTube-Mate.git
   ```
2. Then, install the project dependencies:

   ```sh
   npm install
   ```
3. You can follow the contribution guidelines to proceed

<!-- FEATURES -->
## Features

- [ ] Add Logo

- [x] Page Transitions with @pablopang
- [x] Add Icon Library
  - [x] Put Icons on all Action Buttons
- [x] List Create / Edit Page
  - [x] detect changes in form
  - [x] Prevent navigation if unsaved changes
  - [x] Disable update / save button if no changes 
- [x] List permissions / auth
  - [x] Private lists can only be viewed by the creator
- [ ] List Page
  - [x] Access list via slug
  - [ ] Share list / copy URL to clipboard 
  - [ ] Previous / Next Buttons
  - [ ] Infinite scroll / pagination / lazy loading
  - [ ] On video end, play next video
    - [ ] Loop back to beginning if we reach the end
  - [ ] List Sort / Filters
    * [ ] Views
    * [ ] Newest / Oldest
    * [ ] Likes
    * [ ] Random / Feeling Lucky
    * [ ] Toggle
      * [ ] Shorts
      * [ ] Videos
      * [ ] Live-streams
    * [ ] Duration
      * [ ] Min
      * [ ] Max
    * [ ] Toggle Channels in List
    * [ ] Show 1 video from each channel at a time...
  - [ ] Channel cache refresh button
  - [ ] Show last updated time / cache time for each channel
- [ ] Landing Page / Features
- [ ] Limits
  - [ ] Max number of lists per user
  - [ ] Max number of channels per list
- [ ] Users can favorite a list
- [ ] Show favorited lists on user dashboard
- [ ] Fork an existing list
- [ ] Public user profile page
  - [ ] Show public lists
- [ ] User Preferences
  - [ ] Volume
  - [ ] Video Speed
  - [ ] Autoplay
- [ ] Message Queue
  - [ ] Seperate Service that receives requests for Cacheing
    - [ ] Calls YT API, updates cache
  - [ ] SvelteKit app -> put messages into the queue requesting caching

- [ ] Message Queues
  * [ ] Explore:
    - Redis
      - pub / sub
      - flags

- [ ] Analytics Service
- [ ] Error Reporting

- [ ] Terms of Service
- [ ] GDPR
- [ ] Privacy Policy

- [ ] Firefox tab navigation
- [ ] Redirect to homepage on logout

See the [open issues](https://github.com/SedatUygur/YouTube-Mate/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] List create UX
  - [ ] Only show channel avatar
    - [ ] Small remove button
    - [ ] Tooltip with channel name
  - [ ] Desktop styles - 2 column
    - [ ] Channel adder is on the right
- [x] YouTube Embed API
  - [x] parse timestamps in description, link changes timestamp in video
- [x] Home Page List
  - [x] List actions
    - [x] View
    - [x] Edit
- [x] Fix scroll position on page change
- [x] Video view page
  - [x] expandable description box
  - [x] Render description with markdown
- [x] Containerize tests
- [ ] More integration tests
  - [x] Run tests / containers while dev containers are still running
  - [x] Seed DB with unique users for each type of test
  - [x] TODO: make a watch specific config
    - [x] Watch for only test updates
  - [ ] Tests:
    - [x] Search for YT channels
    - [x] Add YT channel to List
    - [x] Create List
    - [x] View List
      - [x] View individual List
    - [x] Coverage Reports
      - [x] Generate outside container (volume)
    - [x] Navigating Lists
    - [x] Edit List
    - [x] Make sure $LL is being run in tests...
      - [x] Svelte stores highlighted red??
    - [ ] .env.test does not exist on CI server...
    - [ ] Remove test ids in Prod build
    - [ ] Update contributing guide...
      - [ ] Running tests in watch mode...
      - [ ] Debugging tests in watch mode...
      - [ ] Exporting data to be seeded for tests
- [x] Update readme with tech stack
- [ ] Deploy
  - [ ] Database
    - Free Tier
      - Serverless / Edge Function Support...
        - Connection Pooling
      - Fly.io
      - Railway
      - Supabase
      - Render
      - ElephantSQL
    - Paid
      - Heroku
      - AWS RDS
  - [ ] App - Vercel
- [x] Testing todos:
  - [x] Fix tests on CI
    - [x] Docker / prisma test setup
  - [x] Configure e2e tests
  - [x] Seed DB
    - [x] Generate user token during test (do not do oauth flow during test...)
  - Anything else that comes up...
- [x] Create page form styles
  - [x] Channel card styles
- [x] Update the List page styles
- [x] Update DB schema
  - Last updated
  - More metadata
    - Include Channel Image
    - Include Channel handle
    - Number of subscribers
    - Verified badges
- [x] More robust YT API Response
- [x] Lazy load embedded video and thumbnails
- [x] Cache YT API Response
  - [x] Get ALL videos of each channel
  - [x] Get ALL video info of each video
    - [x] View Count
    - [x] Length / Duration
    - [x] Like Count
- [x] Fix YT Video order (latest by default...)
- [x] List Page Styles
  - [x] Fix video titles
- [x] Single Video Page
- [x] Wireframe create list page
- [x] Create list page
  - [x] Set title
  - [x] Set Description
- [x] Eslint / Airbnb / Prettier Setup...
- [x] Setup i18n
  - [x] Research options
  - [x] Install / setup
  - [x] Use dictionaries on landing page

See the [open issues](https://github.com/SedatUygur/YouTube-Mate/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

You can follow the contribution guidelines(CONTRIBUTION.md) to contribute. We have issue templates for bug and feature requests.

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/SedatUygur/YouTube-Mate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SedatUygur/YouTube-Mate" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Sedat Uygur - [@sedat-can-uygur](https://www.linkedin.com/in/sedat-can-uygur) - sedat.uygur@outlook.com

Project Link: [https://github.com/SedatUygur/YouTube-Mate](https://github.com/SedatUygur/YouTube-Mate)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

- [SvelteKit](https://kit.svelte.dev/)
- [Auth.js](https://authjs.dev/)
- [Postgres](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Redis](https://redis.io/)
- [node-redis](https://www.npmjs.com/package/redis)
- [Svelte](https://svelte.dev/)
- [tailwind](https://tailwindcss.com/)
- [Skeleton UI](https://www.skeleton.dev/)
- [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n/)
- [zod](https://www.npmjs.com/package/zod)
- [@googleapis/youtube](https://www.npmjs.com/package/@googleapis/youtube)
- [luxon](https://www.npmjs.com/package/luxon)
- [eslint](https://www.npmjs.com/package/eslint)
- [prettier](https://www.npmjs.com/package/prettier)
- [lint-staged](https://www.npmjs.com/package/lint-staged)
- [husky](https://www.npmjs.com/package/husky)
- [Playwright](https://playwright.dev/)
- [Istanbul](https://www.npmjs.com/package/nyc)
- [Docker](https://www.docker.com/)
- [Github Actions](https://github.com/features/actions)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/SedatUygur/YouTube-Mate.svg?style=for-the-badge
[contributors-url]: https://github.com/SedatUygur/YouTube-Mate/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/SedatUygur/YouTube-Mate.svg?style=for-the-badge
[forks-url]: https://github.com/SedatUygur/YouTube-Mate/network/members
[stars-shield]: https://img.shields.io/github/stars/SedatUygur/YouTube-Mate.svg?style=for-the-badge
[stars-url]: https://github.com/SedatUygur/YouTube-Mate/stargazers
[issues-shield]: https://img.shields.io/github/issues/SedatUygur/YouTube-Mate.svg?style=for-the-badge
[issues-url]: https://github.com/SedatUygur/YouTube-Mate/issues
[license-shield]: https://img.shields.io/github/license/SedatUygur/YouTube-Mate.svg?style=for-the-badge
[license-url]: https://github.com/SedatUygur/YouTube-Mate/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/sedat-can-uygur
[product-screenshot]: images/screenshot.png

[TypeScript-logo]: https://ms-vscode.gallerycdn.vsassets.io/extensions/ms-vscode/vscode-typescript-next/5.8.20241203/1733271143236/Microsoft.VisualStudio.Services.Icons.Default
[TypeScript]: https://www.typescriptlang.org/
[Svelte-logo]: https://avatars.githubusercontent.com/u/23617963?s=256&v=4
[Svelte]: https://svelte.dev/
[JavaScript-logo]: https://static-00.iconduck.com/assets.00/javascript-icon-256x256-0ybhyms4.png
[JavaScript]: https://www.javascript.com/
