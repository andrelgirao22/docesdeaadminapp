import { Category } from './../../model/category.dto';
import { CategoryService } from './../../services/model/category.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {

  category:Category

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingController: LoadingController,
    public categoryService: CategoryService) {
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData() {
    let categoria_id = this.navParams.get('category_id')
    if(categoria_id) {
      let loader=  this.presentLoading()
      this.categoryService.getCategory(categoria_id).subscribe(res => {
        this.category = res
        loader.dismiss()
      }, error =>{
        loader.dismiss()
      })
    }
  }

  presentLoading() {
    
    let loader = this.loadingController.create({
      content: 'Aguarde...',
    });
    
    loader.present()

    return loader
  }

}
