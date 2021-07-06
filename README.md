# sensus
sensus is an abstraction layer to use various AI/ML APIs/services like detecting emotions in text i.e. sentiment analysis

## for local dev

```sh
npm install
npm build
cp .env-sample .env
# edit .env
# enter your IBM URL and API key
npm run sample1
```

sample output:

```
joy 18 %
sadness 51 %
```

## TODO

implement same using AWS, Azure and GCP
