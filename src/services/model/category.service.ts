import { AuthService } from './auth.service';
import { API_CONFIG } from './../../config/api.config';
import { Category } from './../../model/category.dto';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class CategoryService {

    urlCategoryPage:string = `${API_CONFIG.baseUrl}/category/page`
    urlCategory:string = `${API_CONFIG.baseUrl}/category`

    constructor(
        private http: HttpClient,
        private authService: AuthService) {}

    getCategories(search?:string): Observable<any> {
        return this.http.get<Category[]>(this.urlCategoryPage)
    }

    getAllCategories(): Observable<any> {
        return this.http.get<Category[]>(this.urlCategory)
    }

    getCategory(id: string) {
        return this.http.get<Category>(`${this.urlCategory}/${id}`)
    }
    
    addCategory(category: any): Observable<any> {
        console.log(`${this.urlCategory}`)
        if(category.id) {
            return  this.http.put<Category>(
                    `${this.urlCategory}/${category.id}`, 
                    JSON.stringify(category))
        } else {
            return  this.http.post<Category>(
                `${this.urlCategory}`, 
                JSON.stringify(category), 
                {observe: 'response'},)
        }
    }

    delete(id: number) {
        return this.http.delete<Category>(`${this.urlCategory}/${id}`) 
    }

    deletePicture(id: number) {
        return this.http.delete<Category>(`${this.urlCategory}/picture/${id}`) 
    }

    sendImage(file: any, id: string) {
        return this.http.post(`${this.urlCategory}/picture/${id}`, file)

    }

    setCategory(category: Category) {
        return this.http.put<Category>(`${this.urlCategory}`, JSON.stringify(category))
    }
}