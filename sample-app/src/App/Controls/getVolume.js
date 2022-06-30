import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import axios from "axios";

function apiCall(device_id, device_type) {
  const authentication = new Authentication();

  let url =
    device_type === "GROUP"
      ? config.api_end_points.control_api_endpoint
      : config.api_end_points.volume_api_end_point;
  let name_space = device_type === "GROUP" ? "/groupVolume" : "/playerVolume";

  const end_point = url + device_id + name_space;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + authentication.get_access_token(),
  };

  return axios({
    url: end_point,
    method: "get",
    headers: headers,
    data: {},
  });
}

export default function GetVolume(props) {
  apiCall(props.device_id, props.device_type)
    .then((res) => {
      console.debug(props.device_type + " volume at start is : ", res.data);
      props.getVolumeHandler(false, res.data.volume);
    })
    .catch(function (error) {
      console.error(error);
    });
}
