import { Meteor } from "meteor/meteor";
import axios from "axios";

if (Meteor.isServer) {
  Meteor.methods({
    getData(query) {
      console.log(query);
      return axios
        .get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c70fb92c2477e054605e1660f71192f5&text=${
            query.query
          }&sort=relevance&format=json&nojsoncallback=1`
        )
        .then(data => {
          console.log("data: ", data.data.photos.photo.length);
          return data.data;
        });
    }
  });
}
