import config from "@/lib/config.js"
import http from "@/lib/http"
export const getCaptcha = (phone) => http.get(`${config.devPort}/captcha/sent?phone=${phone}`)
export const verificateCode = (phone,code)=> http.get(`${config.devPort}/captcha/verify?phone=${phone}&captcha=${code}`)
export const  login  = (phone, password,captcha)=> http.get(`${config.devPort}/login/cellphone?phone=${phone}&password=${password}&captcha=${captcha}`)
export const  getBanner = ()=> http.get(`${config.devPort}/banner?type=2`)
export const  getPersonalized = ()=> http.get(`${config.devPort}/personalized?limit=20`)
export const  getNewMvData = ()=> http.get(`${config.devPort}/personalized/mv`)
export const  getMvUrl = (id)=> http.get(`${config.devPort}/mv/url?id=${id}`)
