const SHOW_UPLOADER = 'SHOW_UPLOADER';
const HIDE_UPLOADER = 'HIDE_UPLOADER';
const ADD_FILE_TO_UPLOAD = 'ADD_FILE_TO_UPLOAD';
const REMOVE_FILE_FROM_UPLOAD = 'REMOVE_FILE_FROM_UPLOAD';
const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE';

const defaultState = {
   isUploaderVisible: false,
   files: []
}

export default function uploadReducer(state = defaultState, action) {
   switch (action.type) {
      case SHOW_UPLOADER:
         return { ...state, isUploaderVisible: true }
      case HIDE_UPLOADER:
         return { ...state, isUploaderVisible: false, files: [] }
      case ADD_FILE_TO_UPLOAD:
         return { ...state, files: [...state.files, action.payload] }
      case REMOVE_FILE_FROM_UPLOAD:
         return { ...state, files: [...state.files.filter(file => file.id != action.payload)] }
      case CHANGE_UPLOAD_FILE:
         return {
            ...state,
            files: [...state.files.map(file => file.id != action.payload.id
               ? { ...file, progress: action.payload.progress }
               : { ...file })]
         }
      default:
         return state
   }
}

export const showUploader = () => ({ type: SHOW_UPLOADER })
export const hideUploader = () => ({ type: HIDE_UPLOADER })
export const addFileToUpload = (file) => ({ type: ADD_FILE_TO_UPLOAD, payload: file })
export const removeFileFromUpload = (fileId) => ({ type: REMOVE_FILE_FROM_UPLOAD, payload: fileId })
export const changeUploadFile = (file) => ({ type: CHANGE_UPLOAD_FILE, payload: file })
