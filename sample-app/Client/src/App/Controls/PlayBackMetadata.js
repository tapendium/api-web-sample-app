import { PlaybackMetadataApiFactory } from "../museClient/api";

export default function PlayBackMetadata(props) {

  const playBackMetadataApi = new PlaybackMetadataApiFactory(props.configuration);

  playBackMetadataApi.playbackMetadataGetMetadataStatus(props.group_id)
  .then((res) => {
    props.playBackMetadataHandler(
        false,
        res.currentItem.track.name,
        res.currentItem.track.album.name,
        res.container.imageUrl
      );
  })
  .catch(function (error) {
    console.error("Error", error);
  });
}
