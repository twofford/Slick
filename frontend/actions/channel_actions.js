import * as ChannelApiUtil from "../util/channel_util";

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";
export const CLEAR_CHANNEL_ERRORS = "CLEAR_CHANNEL_ERRORS";

export const receiveChannels = (channels) => {
  return {
    type: RECEIVE_CHANNELS,
    channels,
  };
};

export const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel,
  };
};

export const removeChannel = (channel) => {
  return {
    type: REMOVE_CHANNEL,
    channel,
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_CHANNEL_ERRORS,
    errors,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_CHANNEL_ERRORS,
  };
};

export const fetchChannels = () => (dispatch) =>
  ChannelApiUtil.getChannels().then((channels) =>
    dispatch(receiveChannels(channels))
  );

export const fetchChannel = (channelId) => (dispatch) =>
  ChannelApiUtil.getChannel(channelId).then((channel) =>
    dispatch(receiveChannel(channel))
  );

export const createChannel = (channel) => (dispatch) =>
  ChannelApiUtil.postChannel(channel).then(
    (channel) => dispatch(receiveChannel(channel)),
    (errors) => dispatch(receiveErrors(errors.responseJSON))
  );

export const updateChannel = (channel) => (dispatch) =>
  ChannelApiUtil.patchChannel(channel).then((channel) =>
    dispatch(receiveChannel(channel))
  );

export const deleteChannel = (channel) => (dispatch) =>
  ChannelApiUtil.deleteChannel(channel).then((channel) =>
    dispatch(removeChannel(channel))
  );
