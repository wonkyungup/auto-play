import Defs, { TypeDownloader } from '../assets/constatns';

const initialState: TypeDownloader = {
  url: '',
};

const downloaderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Defs.REDUX_DOWNLOADER:
      state.url = action.href;
      console.log(state);
      break;
    default:
      break;
  }

  return state;
};

export { downloaderReducer };
