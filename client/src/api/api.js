import * as axios from "axios";
import { hidePreloader, showPreloader } from "../reducers/appReducer";
import { addFile, deleteFileAC, setFiles } from "../reducers/fileReducer";
import { addFileToUpload, changeUploadFile, showUploader } from "../reducers/uploadReducer";
import { setUser } from "../reducers/userReducer";

const instance = axios.create({
   baseURL: 'http://localhost:5000/api/',
   // withCredentials: true,
   // headers: { 'API-KEY': '718c556a-277b-4513-b77b-893b6f3e2309' },
});

export const registration = async (email, password) => {
   const response = await instance.post('auth/registration',
      { email, password }
   )
   return response.data.message
}

export const login = (email, password) => {
   return async dispatch => {
      try {
         const response = await instance.post('auth/login',
            { email, password }
         )
         dispatch(setUser(response.data.user))
         localStorage.setItem('token', response.data.token)
      }
      catch (e) {
         alert(e.response.data.message)
      }
   }
}

export const auth = () => {
   return async dispatch => {
      try {
         const response = await instance.get('auth/auth', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
         }
         )
         dispatch(setUser(response.data.user))
         localStorage.setItem('token', response.data.token)
      }
      catch (e) {
         console.log(e.response.data.message)
         localStorage.removeItem('token')
      }
   }
}

export const getFiles = (dirId, sort) => {
   return async dispatch => {
      try {
         dispatch(showPreloader())
         let url = 'files'
         if (dirId) {
            url = `files?parent=${dirId}`
         }
         if (sort) {
            url = `files?sort=${sort}`
         }
         if (dirId && sort) {
            url = `files?parent=${dirId}&sort=${sort}`
         }
         const response = await instance.get(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
         })
         dispatch(setFiles(response.data))
      }
      catch (e) {
         alert(e.response.data.message)
      } finally {
         dispatch(hidePreloader())
      }
   }
}

export const createDir = (dirId, name) => {
   return async dispatch => {
      try {
         const response = await instance.post('files', {
            name,
            parent: dirId,
            type: 'dir'
         }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
         })
         dispatch(addFile(response.data))
      }
      catch (e) {
         alert(e.response.data.message)
      }
   }
}

export const uploadFile = (file, dirId) => {
   return async dispatch => {
      try {
         const formData = new FormData()
         formData.append('file', file)
         if (dirId) {
            formData.append('parent', dirId)
         }

         const uploadFile = { name: file.name, progress: 0, id: Date.now() }
         dispatch(showUploader())
         dispatch(addFileToUpload(uploadFile))

         const response = await instance.post('files/upload', formData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            onUploadProgress: progressEvent => {
               const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
               if (totalLength) {
                  uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                  dispatch(changeUploadFile(uploadFile))
               }
            }
         })
         dispatch(addFile(response.data))
      }
      catch (e) {
         alert(e.response.data.message)
      }
   }
}

export const downloadFile = async (file) => {
   const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
   })
   if (response.status === 200) {
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
   }
}

export const deleteFile = (file) => {
   return async dispatch => {
      try {
         const response = await instance.delete(`files?id=${file._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
         })
         dispatch(deleteFileAC(file._id))
         return (response.data.message)
      }
      catch (e) {
         alert(e.response.data.message)
      }
   }
}

export const searchFile = (searchQuery) => {
   return async dispatch => {
      try {
         const response = await instance.get(`files/search?search=${searchQuery}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
         })
         dispatch(setFiles(response.data))
      }
      catch (e) {
         alert(e?.response?.data?.message)
      } finally {
         dispatch(hidePreloader())
      }
   }
}

