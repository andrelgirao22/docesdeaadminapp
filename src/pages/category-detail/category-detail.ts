import { Category } from './../../model/category.dto';
import { CategoryService } from './../../services/model/category.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {

  category:Category
  formGroup: FormGroup

  picture: string
  profileImage
  cameraOn: boolean = false

  imageSelected: any
  selectedFile: File

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingController: LoadingController,
    public categoryService: CategoryService,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public sanitizer: DomSanitizer) {

      this.profileImage = 'assets/imgs/avatar-blank.png'
      
      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required]]
      })

  }

  ionViewDidLoad() {

    let categoria_id = this.navParams.get('category_id')
    if(categoria_id) {
      let loader=  this.presentLoading()
      this.categoryService.getCategory(categoria_id).subscribe(res => {
        this.category = res

        this.formGroup.controls.name.setValue(this.category.name);

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

  onFileSelected(event) {
    this.selectedFile = event.target.files[0]

    let reader = new FileReader()
    reader.onload = (e: any) => {
      this.imageSelected = e.target.result
    }

    reader.readAsDataURL(this.selectedFile)
  }

  save() {
    const fd = new FormData()
    fd.append('file', this.selectedFile)

    this.categoryService.addCategory(this.category).subscribe(res => {
      
      if(!this.category.id) {
        let location = res.headers.get('location')
        let id = location.substring(location.lastIndexOf('/') + 1)
        this.category.id = id
      }

      if(this.selectedFile) {
        this.categoryService.sendImage(fd, this.category.id + "").subscribe(res => {
        }, error => {})
      } else {
      }
    })

  }

  getCameraPicture() {

    this.cameraOn = true

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then(imageData => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false
    }, err => {
      this.cameraOn = false
    });
  }

  getGalleryPicture() {

    this.cameraOn = true

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then(imageData => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false
    }, err => {
      this.cameraOn = false
    });
  }

}
