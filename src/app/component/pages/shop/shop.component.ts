import {Component, OnDestroy, OnInit} from '@angular/core';
import {MedicineService} from 'src/app/services/medicine/medicine.service';
import {Medicine} from '../../../models/medicine/medicine';
import {Search} from '../../../models/medicine/search';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  public medicineList: any = [];

  public imageSearched: string;
  public imgView: any;

  public imageName: string;

  public medicineModel = new Medicine('');

  public searchModel = new Search('');

  constructor(
    public medicineService: MedicineService
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('medicine') === "undefined" ) {
      this.loadMedicineList();
    } else {
      this.imageName = localStorage.getItem('medicine');
      this.searchSuppliers(this.imageName);
    }
  }

  loadMedicineList() {
    this.medicineService.retrieveMedicineList().then(
      data => {
        this.medicineList = data;
      }
    );
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.imageName = event.target.files[0].name;
      if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpg') {
        reader.onload = (_event) => {
          this.imgView = reader.result;
          this.imageSearched = this.imgView.toString().slice(22);
          this.searchModel.image = this.imgView;
        };
      } else if (event.target.files[0].type === 'image/jpeg') {
        reader.onload = (_event) => {
          this.imgView = reader.result;
          this.imageSearched = this.imgView.toString().slice(23);
          this.searchModel.image = this.imgView;
        };
      }
    }
  }

  searchSuppliers(result: any) {
    this.medicineModel.name = result;
    this.medicineService.searchMedicineList(this.medicineModel).then(
      data => {
        this.medicineList = data;
      }
    );
  }

  uploadImage() {
    this.medicineService.medicineUpload(this.searchModel).then(
      data => {
        if (data) {
          this.searchSuppliers('Kinihiriya');
        }
      }
    );
  }

  ngOnDestroy() {
    localStorage.setItem('medicine', 'undefined');
  }
}
