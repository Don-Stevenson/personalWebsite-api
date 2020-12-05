# Personal Website Api

A server built using express js to handle email from a website.
This project is based on a tutorial by [Garrett Love](https://github.com/garrettlove8/building-react-portfolio) but with several upgrades including :

- using async await instead of .then () => syntax,
- use of the dotenv dependency to handle process.env variables,
- and a work around to handle twilios rejection of emails being sent from
  address's other than the email registered with them.
