let accessToken;
const clientID = "bb099cdf559a485c81b26f8a2fb1eac1";
const redirectURI = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      console.log("if");
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      console.log(expiresIn);
      //clears parameters allowing access to new token when it expires
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      // Don't need this, idk why its here.
      //   window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      console.log("elsese");
      const accessUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },
  async search(term) {
    console.log("testsetset");
    const accessToken = Spotify.getAccessToken();

    console.log(accessToken);
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      art: track.album.images,
      uri: track.uri,
    }));
  },
  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    console.log(accessToken);

    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: headers,
    });
    const jsonResponse = await response.json();
    userId = jsonResponse.id;
    const response_1 = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: name }),
      }
    );
    const jsonResponse_1 = await response_1.json();
    const playlistId = jsonResponse_1.id;
    return await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ uris: trackUris }),
      }
    );
  },
};

export default Spotify;
