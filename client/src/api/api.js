import * as axios from "axios";
import { addFile, setFiles } from "../reducers/fileReducer";
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

export const getFiles = (dirId) => {
   return async dispatch => {
      try {
         const response = await instance.get(`files${dirId ? '?parent=' + dirId : ''}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
         })
         dispatch(setFiles(response.data))
      }
      catch (e) {
         alert(e.response.data.message)
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

