import { Category } from './../../model/category.dto';
import { CategoryService } from './../../services/model/category.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  categories: Category[] = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private categoryService: CategoryService) {
  }

  ionViewDidLoad() {
   
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.content
    })

  }

}
