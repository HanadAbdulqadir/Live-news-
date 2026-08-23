// Pinned Rumble streams — generated, do not edit by hand.
//
//   python scripts/check-rumble.py
//
// Rumble has no channel-level live URL the way YouTube does, so each stream
// is pinned to one embed ID and re-checked by the script above. Every entry
// here was confirmed to still be owned by the broadcaster named in it.
//
// This is the only route to broadcasters YouTube has removed: RT has no
// YouTube presence at all, and the channels search returns for it are
// re-uploads from unrelated accounts.

export const RUMBLE_CHECKED = '2026-08-23';

export const RUMBLE_CHANNELS = {
  'RT': {
    embedId: 'vtp5hp',
    country: 'Russia',
    author: 'RT',
    title: 'RT News | Livestream 24/7',
    live: false,
  },
  'Press TV': {
    embedId: 'v4etgb3',
    country: 'Iran',
    author: 'Press TV',
    title: 'PressTV Live',
    live: false,
  },
};

// Embed URL for a Rumble stream that is broadcasting now, else null.
// An off-air 24/7 slot serves a recording of its last broadcast, which must
// not be presented as live.
export const getRumbleStreamUrl = (broadcaster) => {
  const channel = RUMBLE_CHANNELS[broadcaster];
  return channel && channel.live
    ? `https://rumble.com/embed/${channel.embedId}/`
    : null;
};

// Watch page for a pinned stream, live or not.
export const getRumbleWatchUrl = (broadcaster) => {
  const channel = RUMBLE_CHANNELS[broadcaster];
  return channel ? `https://rumble.com/embed/${channel.embedId}/` : null;
};

export const hasRumbleStream = (broadcaster) =>
  Object.prototype.hasOwnProperty.call(RUMBLE_CHANNELS, broadcaster);
