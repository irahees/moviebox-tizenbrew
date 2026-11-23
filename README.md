# MovieBox TV — TizenBrew application module

An original, remote-friendly streaming-library interface for Samsung Tizen TVs running TizenBrew. This is an application module, not an Android APK or standalone .wgt.

## Add to TizenBrew

Open TizenBrew → Module Manager → Add GitHub Module and enter:

`gh/irahees/moviebox-tizenbrew@main`

## Catalogue format

In the app choose **Connect catalogue** and enter an HTTPS URL returning a JSON array:

```json
[
  {
    "title": "My Film",
    "type": "movie",
    "year": 2025,
    "genre": "Drama",
    "description": "A film in my own library",
    "poster": "https://example.com/poster.jpg",
    "url": "https://example.com/authorized-playback.mp4"
  }
]
```

The type can be movie or series. Poster, year, genre, description and url are optional. Playback depends on the TV browser's supported media formats and the provider's authorization and network settings. Use only streams you are authorized to access.

## Notes

- Sample titles are placeholders only.
- The catalogue URL must be reachable from the TV.
- Do not put passwords or private tokens in a public catalogue or repository.
- This module does not install Android APKs, include pirated streams, scrape third-party services, or bypass DRM.
