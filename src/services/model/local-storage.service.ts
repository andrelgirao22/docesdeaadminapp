import { STORAGE_KEY } from './../../config/storage-keys.config';
import { Injectable } from '@angular/core';
import { TokenDTO } from '../../model/token.dto';

@Injectable()
export class LocalStorageService {
    
    constructor() {}

    getLocalUser(): TokenDTO {
        let account  = localStorage.getItem(STORAGE_KEY.localUser)
        if(account == null) {
            return null
        }

        return JSON.parse(account)
    }

    setLocalUser(obj: TokenDTO) {
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEY.localUser)
        } else {
            localStorage.setItem(STORAGE_KEY.localUser, JSON.stringify(obj))
        }
    }
}