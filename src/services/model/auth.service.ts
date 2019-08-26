import { CredenciaisDTO } from './../../model/credenciais.dto';
import { API_CONFIG } from './../../config/api.config';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDTO } from '../../model/token.dto';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        public http: HttpClient, 
        public storageService: LocalStorageService) {}

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, 
            creds, 
            {
                observe: "response",
                responseType: "text"
            })
    }

    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh`, 
            {}, 
            {
                observe: "response",
                responseType: "text"
            })
    }

    successfullLogin(obj: TokenDTO): boolean {
        if(obj.access_token) {
            obj.email = this.jwtHelper.decodeToken(obj.access_token).sub
            this.storageService.setLocalUser(obj)
            return true
        }

        return false
    }
    
    isLoggedIn() {
        return this.storageService.getLocalUser() !== null
    }

    getLogin() {
        return this.storageService.getLocalUser()
    }

    logout() {
        this.storageService.setLocalUser(null)
    }

}