const { Pool } = require('pg');

class PlaylistService {
    constructor() {
        this._pool = new Pool();
    }

    async getSongInPlaylist(playlistId) {
        const playlistQuery = {
            text: 'SELECT playlists.id, playlists.name, users.username FROM playlists LEFT JOIN users ON playlists.owner = users.id WHERE playlists.id = $1',
            values: [playlistId],
        };

        const SongsQuery = {
            text: 'SELECT songs.id, songs.title, songs.performer FROM songs LEFT JOIN playlist_songs ON songs.id = playlist_songs.song_id WHERE playlist_songs.playlist_id = $1',
            values: [playlistId],
        };

        const playlistResult = await this._pool.query(playlistQuery);
        const songsResult = await this._pool.query(SongsQuery);

        return {
            ...playlistResult.rows[0],
            songs: songsResult.rows,
        };
    }
}

module.exports = PlaylistService;